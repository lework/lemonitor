const path = require("path");
const resolve = dir => path.resolve(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin"); //Gzip
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin; //Webpack包文件分析器
const CopyWebpackPlugin = require("copy-webpack-plugin");

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); //env
const isAnalyz = process.env.IS_ANALYZ === "true";

module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.API_ROOT : "./", //打包后的位置(如果不设置这个静态资源会报404)
  outputDir: "docs", //打包后的目录名称
  assetsDir: "static", //静态资源目录名称
  productionSourceMap: false, //去掉打包的时候生成的map文件
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  filenameHashing: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: !IS_PROD,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    // 打包分析
    // if `IS_ANALYZ` env is TRUE on report bundle info
    isAnalyz &&
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static"
        }
      ]);

    // 修复HMR
    config.resolve.symlinks(true);

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    // config.plugin("html").tap(args => {
    //   // 修复 Lazy loading routes Error
    //   args[0].chunksSortMode = "none";
    //   return args;
    // });

    // config.resolve.extensions
    //   .prepend(".js")
    //   .prepend(".vue")
    //   .prepend(".json");

    // 添加别名
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"));
    // .set("@ant-design/icons/lib/dist$", resolve("src/utils/antdIcon.js"));

    if (IS_PROD) {

      // 压缩图片
      // 需要 npm i -D image-webpack-loader
      config.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
        });
    }
  },
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // open: false, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target: "http://hosts/api", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用 websockets
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  configureWebpack: config => {
    const plugins = [];
    // 拷贝static目录
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "static"),
          to: path.resolve(__dirname, "docs/static"),
          ignore: [".*"]
        }
      ])
    );

    if (IS_PROD) {
      // 开启 gzip 压缩
      // 需要 npm i -D compression-webpack-plugin
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  }
};
