const path = require('path');

module.exports = {
  entry: {
    main: [
      './Typescript/CallList/CallList.Index.ts'
    ]
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'admindemo.[name].bundle.js',
    path: path.resolve(__dirname, 'wwwroot', 'ts')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};