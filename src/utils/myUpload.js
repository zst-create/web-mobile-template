import { stsAuthCoverAccessUrl, doUpLoad } from '@/api/upload'
import { generateTimeReqestNumber, randomString } from '@/utils/filter'
// import {compressImg} from "utils/compress";

export function UploadImg(config) {
  this.option = {
    docTypeCd: config.docTypeCd,
    sysTypeCd: config.sysTypeCd,
    accountNo: config.accountNo
  }
  this.getOSSKey = async function() {
    const json = {
      requestJson: JSON.stringify({
        docTypeCd: this.option.docTypeCd,
        sysTypeCd: this.option.sysTypeCd
      })
    }
    await stsAuthCoverAccessUrl(json).then(data => {
      const obj = data.data[0].tokenInfo
      this.oSSObject = {
        host: obj.host,
        policyBase64: obj.policy,
        accessid: obj.accessid,
        signature: obj.signature,
        expire: parseInt(obj.expire),
        key: obj.dir + '/',
        size: obj.sizelimit
      }
    })
  }
  /**
   * 把base64的图片的dataURL转为文件对象
   * @param dataurl
   * @returns {file}
   */
  this.dataURLtoFile = function(dataurl, filename) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  //  使用canvas对大图片进行压缩
  this.compress = async function(img, quality = 0.5) {
    console.log(img, 'img')
    console.log(img.src, 'img.src')
    //    用于压缩图片的canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // //    瓦片canvas
    // var tCanvas = document.createElement("canvas");
    // var tctx = tCanvas.getContext("2d");

    var initSize = img.src.length
    var width = img.width
    var height = img.height

    canvas.width = width
    canvas.height = height
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, width, height)

    // //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    // var ratio;
    // if ((ratio = (width * height) / 4000000) > 1) {
    //   ratio = Math.sqrt(ratio);
    //   width /= ratio;
    //   height /= ratio;
    // } else {
    //   ratio = 1;
    // }
    // canvas.width = width;
    // canvas.height = height;
    // // 铺底色
    // ctx.fillStyle = "#fff";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    // //如果图片像素大于100万则使用瓦片绘制
    // var count;
    // if ((count = (width * height) / 1000000) > 1) {
    //   count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //   // 计算每块瓦片的宽和高
    //   var nw = ~~(width / count);
    //   var nh = ~~(height / count);
    //   tCanvas.width = nw;
    //   tCanvas.height = nh;
    //   for (var i = 0; i < count; i++) {
    //     for (var j = 0; j < count; j++) {
    //       tctx.drawImage(
    //         img,
    //         i * nw * ratio,
    //         j * nh * ratio,
    //         nw * ratio,
    //         nh * ratio,
    //         0,
    //         0,
    //         nw,
    //         nh
    //       );
    //       ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
    //     }
    //   }
    // } else {
    //   ctx.drawImage(img, 0, 0, width, height);
    // }

    // 进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', quality)
    console.log('压缩前：' + initSize)
    console.log('压缩后：' + ndata.length)
    console.log(
      '压缩率：' + ~~((100 * (initSize - ndata.length)) / initSize) + '%'
    )
    // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    // console.log(ndata, "ndata");
    const imgFile = await this.dataURLtoFile(ndata, img.name)
    return imgFile
  }

  this.uploadFile = async function(curFile, callback) {
    // let fileArr = await compressImg([curFile]);
    // console.log(fileArr)
    console.log('curFile', curFile)
    console.log('oSSObject', this.oSSObject)

    const reader = new FileReader()
    reader.readAsDataURL(curFile) // input.files[0]为第一个文件
    reader.onload = async() => {
      var beforeImg = new Image()
      beforeImg.src = reader.result
      // 图片加载完毕之后进行压缩，然后上传
      beforeImg.onload = async() => {
        curFile = await this.compress(beforeImg) // reader.result为获取结果
        console.log('curFile', curFile)
        if (!this.oSSObject) {
          console.log('hhhhhh')
          await this.getOSSKey()
        }

        // const formData = new FormData();
        const fileTime = generateTimeReqestNumber()
        const randomStr = randomString(5)
        // const key =
        //   this.oSSObject.key +
        //   this.option.accountNo +
        //   "_" +
        //   fileTime +
        //   "_" +
        //   randomStr +
        //   ".png";
        // formData.append("key", key);
        // formData.append("policy", this.oSSObject.policyBase64);
        // formData.append("OSSAccessKeyId", this.oSSObject.accessid);
        // formData.append("signature", this.oSSObject.signature);
        // formData.append("file", curFile);
        // formData.append("success_action_status", "200");
        // console.log("file size", curFile.size);

        // // if (curFile.size > this.oSSObject.size * 1024) {
        // //   this.$toast.fail("请选择小于" + this.oSSObject.size / 1024 + "M的图片");
        // //   return;
        // // }

        // console.log("formData", formData);
        // doUpLoad(this.oSSObject.host, formData)
        //   .then(data => {
        //     console.log("doUpLoad", data);
        //     this.iconUrl =
        //       this.oSSObject.host +
        //       "/" +
        //       this.oSSObject.key +
        //       this.option.accountNo +
        //       "_" +
        //       fileTime +
        //       "_" +
        //       randomStr +
        //       ".png";
        //     console.log(this.iconUrl);
        //     callback && callback(this.iconUrl);
        //   })
        //   .catch(err => {
        //     console.log("err", err);
        //     callback && callback(null);
        //   });

        this.iconUrl =
              this.oSSObject.host +
              '/' +
              this.oSSObject.key +
              this.option.accountNo +
              '_' +
              fileTime +
              '_' +
              randomStr +
              '.png'
        console.log(this.iconUrl)
        callback && callback(curFile, this.iconUrl)
      }
      // if (beforeImg.complete) {
      //     callback();
      // } else {
      //   beforeImg.onload = callback;
      // }
    }
  }
}
