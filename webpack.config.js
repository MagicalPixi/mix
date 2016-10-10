var fs = require('fs');
var path = require('path');

var webpack = require('webpack');

module.exports = {
  plugins:[
    new webpack.DefinePlugin({
      __DEBUG__:true
    }),
  ],
  externals:{
    'pixi':'PIXI',
    'PIXI':'PIXI'
  },
  resolve: {
    extensions: ['', '.js']
  },
  entry: {
    main:'./src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "/dist/",
    filename: 'dist.js'
  },
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader?variable=data'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map'
};
