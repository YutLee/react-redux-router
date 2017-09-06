const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: {
    'react': ['react', 'react-dom', 'react-router-dom'],
    'redux': ['react-redux', 'redux'],
    'app': [
      'whatwg-fetch',
      path.resolve(__dirname, '../src/index')
    ],
    'mock': path.resolve(__dirname, '../src/mock/index')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, include: path.resolve(__dirname, '../src'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(ico|gif|png|jpe?g)$/i, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.woff2?$/, loader: 'url-loader?name=fonts/[name].[ext]&limit=100000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.json$/, loader: 'file-loader?name=mock/[name].[ext]' },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'//css-loader can't resolve correctly the path to the generated spritesheet. The possible solution is to skip url resolving.
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie 9']
                  }),
                  require('cssnano')({safe: true})
                ];
              }
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['react', 'redux'/*, 'vendor'*/],
      // filename: 'js/react.js'
      // async: true,
      minChunks: 3,
      // chunks:['app']
    }),
    new HtmlWebpackPlugin({
      // chunks: ['vendor', 'redux-react', 'app'],
      // excludeChunks: [], //排除块
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeRedundantAttributes: true,
        // useShortDoctype: true,
        // removeEmptyAttributes: true,
        // removeStyleLinkTypeAttributes: true,
        // keepClosingSlash: true,
        // minifyJS: true,
        // minifyCSS: true,
        // minifyURLs: true
      }
    })
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), // match the output path
    publicPath: '/',
    // compress: true,
    // // colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    // inline: true,//实时刷新
    // hot: true,
    // disableHostCheck: true,//如果host设置为0.0.0.0，则disableHostCheck必须设置为true，局域网内其他ip才可以访问
    // host: '0.0.0.0', //192.168.1.110
    open: true,
    port: 3000,
    // Info: true,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:4002',
      //   changeOrigin: true
      // }
    }
  }
};

module.exports = config;
