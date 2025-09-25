const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // vue跨域 反向代理
  devServer:{
    proxy:{
      '/api':{
        target:'http://60.205.2.196:7000',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.CI_PROJECT_NAME + '/fengxing-10.github.io'
    : '/'
})
