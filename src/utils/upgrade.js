import { sysModuleVersionApi } from "@/api/parent-GFY";

//检测新版本升级
export function upgradeForAndroid( releasePath,packageName,_this) {

  var url = releasePath;    //apk所在的服务器路径
  var targetPath = cordova.file.externalCacheDirectory + "Download/gaofenyun/" + packageName;   //要下载的目标路径及文件名
  var trustHosts = true;
  var options = {};

  console.log("url:" + url);
  console.log("targetPah:" + targetPath);
  console.log("trustHost:" + trustHosts);
  downLoadApp();

  function downLoadApp() {
// 初始化FileTransfer对象
    var fileTransfer = new FileTransfer();
    fileTransfer.onprogress = function(progressEvent) {
      if (progressEvent.lengthComputable) {
        let downloadProgress = (progressEvent.loaded / progressEvent.total) * 100;
        _this.$toast.loading({
          mask: true,
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '下载中：' + Math.floor(downloadProgress) + "%"
        });
      }
    };
    _this.$toast.clear();
    // 调用download方法
    fileTransfer.download(
        url,         //uri网络下载路径
        targetPath,      //url本地存储路径
        function (entry) {
          console.log("download complete: " + entry.toURL());
          cordova.plugins.fileOpener2.open(
              targetPath,
              'application/vnd.android.package-archive',
              {
                error: function (e) {
                  console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                  _this.$toast.fail("打开下载文件失败");
                },
                success: function () {
                  console.log('open successfully');
                }
              })
        },
        function (error) {
          _this.$toast.fail("下载失败");
          console.log("download error source " + error.source);
          console.log("download error target " + error.target);
          console.log("upload error code" + error.code);
        }
    );
  }
}

/*
 * 检测升级方法
 */
export function  checkUpgrade(platformType, title ,_this) {
  console.log("设备类型：" + platformType);
  var appName = "应用名字";
  var appType = platformType;
  /**
   * 从服务器获取应用的版本信息，和本地应用版本对比
   * @param appName 应用名称
   * @param appType 应用类型
   */
  var param = {
    "interUser": "control_app",
    "interPwd": "E10ADC3949BA59ABBE56E057F20F883E",
    "moduleType": "T06",
    "schoolId": -1,
    "classId": -1
  };
  if (platformType =='Android') {
    param['moduleType'] = 'T06';
  } else if (platformType =='iOS') {
    param['moduleType'] = 'T07';
  }
  function compareVersion(curV,reqV) {
    if (curV && reqV) {
      //将两个版本号拆成数字
      let arr1 = curV.split('.'),
          arr2 = reqV.split('.');
      console.log(arr1)
      console.log(arr2)
      let minLength = Math.min(arr1.length, arr2.length),
          position = 0,
          diff = 0;
      //依次比较版本号每一位大小，当对比得出结果后跳出循环
      while (position < minLength) {
        diff = parseInt(arr1[position]) - parseInt(arr2[position]);
        if (diff != 0) {
          break;
        }
        position++;
      }
      diff = (diff != 0) ? diff : (arr1.length - arr2.length);
      //若curV大于reqV，则返回true
      return diff >= 0;
    } else {
      //输入为空
      console.log("版本号不能为空");
      return false;
    }
  }

  sysModuleVersionApi.getLatestModuleVerion({requestJson: JSON.stringify(param)}).then((response) => {
    if(response!=null && response.flag){
      var  packageName = "app-release-parent.apk";
      var releasePath = response.data[0].versionRecord.downloadUrl;
      var serverVersion = response.data[0].versionRecord.versionCode;
      //获取本地App版本;
      cordova.getAppVersion.getVersionNumber().then(function (version) {
        console.log("本地版本：" + version);
        console.log("服务器版本：" + serverVersion);
        let flag = compareVersion(version,serverVersion);

        if (!flag) {
          if (platformType =='Android'){
            _this.$dialog.confirm({
              title: response.data[0].versionRecord.uploadTitle,
              message: response.data[0].versionRecord.uploadDetail
            }).then(() => {
              console.log("---Android升级中,请稍后---");
              upgradeForAndroid(releasePath,packageName,_this);
            }).catch(() => {
              // on cancel
              _this.$toast.fail("取消升级");
            });
          }else if (platformType =='iOS') {
            // _this.$dialog.confirm({
            //   title: response.data[0].versionRecord.uploadTitle,
            //   message: response.data[0].versionRecord.uploadDetail
            // }).then(() => {
            //   console.log("---Ios升级中,请稍后---");
            //   cordova.plugins.externalExtension.openURL(releasePath);
            //
            // }).catch(() => {
            //   // on cancel
            //   //_this.$toast.fail("取消升级");
            // });

          }

        }
      });
    }
  },(errMsg)=>{
    console.log("获取版本失败：", errMsg);
    _this.$toast.fail("获取版本失败");
  });

  document.addEventListener('offline', function () {
    console.log("网络异常，不能连接到服务器！");

    _this.$toast.fail("网络异常，不能连接到服务器！");

  }, false);
}



