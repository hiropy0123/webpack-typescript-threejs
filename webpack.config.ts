import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';


// 'production' か 'development' を指定
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');

const config: webpack.Configuration = {
  mode: MODE,
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'style-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
        },
        exclude: /node_modules/,
      },
      {
        // GLSLファイルは raw-loader でインポートする
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader"]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`
    }),
    new CopyWebpackPlugin([
      {
        from: `${__dirname}/static/images/**/*`,
        to: `${__dirname}/dist/images`,
        flatten: true
      }
    ]),
  ],
  devServer: {
    contentBase: `${__dirname}/dist/`,
    watchContentBase: true,
    open: true,
    port: 4200
  }
};

export default config;
