/**
 * Sagui configuration object
 */
module.exports = {
  /**
   * Different application entry-points
   * Each page is a combination of a JavaScript file and a HTML file
   *
   * Example: 'index' -> 'index.html' and 'index.js'
   */
  pages: ['index'],

  /**
   * List of Sagui plugins to disable
   */
  disabledPlugins: [],

  /**
   * Webpack configuration object
   * see: http://webpack.github.io/docs/configuration.html
   *
   * Will ovewrite and extend the default Sagui configuration
   */
  webpackConfig: {
    babel: {
      optional: ['runtime', 'jscript'],
      stage: 0,
      loose: 'all'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: [
            /node_modules\/.*/i
          ],
          // The optional[]=jscript is required if we want to support IE8, https://github.com/babel/babel/pull/1382
          loader: 'babel?optional[]=jscript&stage=0&loose=all'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]'
        }
      ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    },
    externals: {
      // https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  },

  /**
   * Karma configuration object
   * see: https://karma-runner.github.io/0.13/config/configuration-file.html
   *
   * Will overwrite and extend the default Sagui configuration
   */
  karmaConfig: {
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.spec.*',
      { pattern: 'src/**/*', watched: true, included: false }
    ]
  }
}
