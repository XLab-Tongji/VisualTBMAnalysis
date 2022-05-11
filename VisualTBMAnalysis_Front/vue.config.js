// 跨域配置
module.exports = {
  devServer: { //记住，别写错了devServer
    // port: 9876,     //设置本地默认端口  选填
    proxy: { //设置代理，必须填
      '/api': { //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
        target: 'http://localhost:8081', //代理的目标地址
        changeOrigin: true, //是否设置同源，输入是的
        pathRewrite: { //路径重写
          '/api': '' //选择忽略拦截器里面的单词
        }
      }
    }
  },
  // 公共路径(必须有的)
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 我用的only，打包后小些
  runtimeCompiler: false,
  productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  // css相关配置(我暂时没用到)
  // css: {
  // 是否使用css分离插件 ExtractTextPlugin
  // extract: true,
  // 开启 CSS source maps?
  // sourceMap: false,
  // css预设器配置项
  // loaderOptions: {},
  // 启用 CSS modules for all css / pre-processor files.
  // modules: false
  // },
}
