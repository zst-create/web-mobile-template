gfy-mobile-template

介绍

这是一篇关于 vue2x 移动端基础框架的使用文档，本框架以 vue全家桶+vant 为基础进行搭建的，包括且不限于 vue+vue-router+vuex+axios+vant 等核心包。

目录结构

    ├── public                     # 静态资源
    │   │── favicon.ico            # favicon图标
    │   └── index.html             # html模板
    ├── src						   # 源代码
    │   ├── api                    # 所有请求
    │   ├── assets                 # css img等静态资源
    │   ├── components             # 全局公用组件             
    │   ├── filters                # 全局 filter
    │   ├── icons                  # 项目所有 svg icons
    │   ├── router                 # 路由
    │   ├── store                  # 全局 store管理
    │   ├── utils                  # 全局公用方法
    │   ├── views                  # views 所有页面
    │   ├── App.vue                # 入口页面
    │   ├── main.js                # 入口文件 加载组件 初始化等
    │   └── permission.js          # 权限管理
    ├── .browserslistrc
    ├── .editorconfig
    ├── .env.alpha                 # 打包cordova app
    ├── .env.development           # 本地环境
    ├── .env.production            # 正式环境
    ├── .env.sit                   # 集成环境
    ├── .eslintrc.js               # eslint 配置项
    ├── .postcssrc.js
    ├── babel.config.js
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vue.config.js

快速上手

    #克隆
    git clone https://github.com/web-vue-template/web-mobile-template.git
    
    #进入gfy-mobile-template文件夹
    cd gfy-mobile-template
    
    #下载
    npm install
    
    #启动
    npm run serve
    
    #访问
    http://localhost:8080
    
    #打包集成环境
    npm run sit
    
    #打包正式环境
    npm run build


