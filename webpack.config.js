const
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/js/main.js'),
  resolve: {
    enforceExtension: false,
    alias: {
      Engine: path.resolve(__dirname, 'src/js/engine/'),
      Scene: path.resolve(__dirname, 'src/js/scene/'),
      Objects: path.resolve(__dirname, 'src/js/objects/'),
      Classes: path.resolve(__dirname, 'src/js/classes/')
    }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/pug/index.pug')
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
}
