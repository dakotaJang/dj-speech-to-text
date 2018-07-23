const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  entry: './src/dj-speech-to-text.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  output: {
    filename: 'djSpeechToText.min.js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};