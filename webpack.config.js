const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  dist: path.join(__dirname, 'dist'),
  style: path.join(__dirname, 'app/css/style.css')
};

const common = {
  entry: {
    index: path.join(PATHS.app, 'index.jsx'),
    style: PATHS.style
  },
  resolve: {
    root: PATHS.app,
    alias: {
      libs:       'libs',
      constants:  'constants'
    },
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jpe?g$|\.gif$|\.png$/,
        loader: 'file',
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.html',
      template: 'app/templates/template.ejs'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};

if(TARGET === 'build' || !TARGET) {
  module.exports = merge(common, {
    entry: {
      vendor: Object.keys(pkg.dependencies).filter(function(v) {
        return v !== 'font-awesome' && v !== 'tether' && v !== 'bootstrap';
      })
    },
    output: {
      path: PATHS.dist,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        }
      ]
    },
    plugins: [
      new CleanPlugin(
        [PATHS.dist]
      ),
      new ExtractTextPlugin('[name].[chunkhash].css', {
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        children: true,
        async: true,
        minChunks: 3
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}

if(TARGET === 'develop') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.dist,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT || 7070
    },
    output: {
      publicPath: 'http://localhost:7070/'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css', {
        allChunks: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: [
            'style?sourceMap',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
          ]
        }
      ]
    }
  });
}
