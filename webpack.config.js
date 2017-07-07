var packageJSON = require('./package.json');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});
/*
const common = {
  module: {
    loaders: [
      ]
  },
  plugins: [
    ],
  resolve: {
    extensions: ['', '.js', '.jsx'] // common extensions
  }
  // other plugins, postcss config etc. common for frontend and backend
};
*/
const frontend = {
  context: __dirname + "/src/main/frontend",
  entry: './app.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/static/assets'),
    publicPath: '/assets/'
  },
  // other loaders, plugins etc. specific for frontend
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      }, {
        test: /.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: 'sourcemap',
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: './dist/static/',
    inline: true,
    disableHostCheck: true
  }
};

const backend = {
  context: __dirname + "/src/main/backend",
  entry: './main.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  externals: nodeModules,
  /*module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },*/
  plugins: [new webpack.IgnorePlugin(/\.(css|less)$/)
    /*new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false
    })*/
    ],
  devtool: 'sourcemap',
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
};

module.exports = [Object.assign({}, frontend), Object.assign({}, backend)];

/*module.exports = {
  context: __dirname + '/src/main/react',
  entry: './index.jsx',

  output: {
    path: __dirname + '/src/main/webapp/assets/',
    filename: 'bundle.js',
    publicPath: 'assets'
  },

  devServer: {
    port: 8081,
    contentBase: './src/main/webapp',
    inline: true,
    proxy: {
      '/app': {
        target: 'http://localhost:8080'
      }
    }
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      }, {
        test: /.json$/,
        loader: 'json-loader'
      }
    ]
  }
};*/
