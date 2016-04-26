var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: path.resolve(__dirname, 'index.js'),
  
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    filename: 'index.bundle.js',
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [
      { test: /\.jsx*$/, 
        exclude: [
          /node_modules/,
          /babel-register/
        ], 
        loader: 'babel-loader',
      }
    ]
  },
  
  plugins: [
    //new webpack.IgnorePlugin(/babel-register/),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
  ]

}