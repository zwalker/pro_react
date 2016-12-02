module.exports = {
  devtool: 'eval-source-map',
  entry: [
    './source/app.js',
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  devServer: {
    historyApiFallback: true
  },
};
