import webpack = require('webpack')
import path = require('path')
import HtmlWebpackPlugin = require('html-webpack-plugin')

enum WebpackMode {
  Production = 'production',
  Development = 'development',
}

interface Argv {
  mode: WebpackMode
  watch?: boolean
  analyze?: boolean
}

export default (_env, argv: Argv) => {
  const isDev = argv.mode === WebpackMode.Development
  const publicDirName = path.resolve(__dirname, './dist')

  return {
    devtool: isDev ? 'inline-source-map' : false,
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${argv.mode}"`,
        },
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    entry: {
      main: path.resolve(__dirname, './src/index.tsx'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader' }],
          exclude: '/node_modules/',
        },
        {
          test: /\.html$/,
          use: [{ loader: 'html-loader' }],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [{ loader: 'url-loader' }],
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: publicDirName,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    performance: {
      hints: false,
    },
    devServer: {
      contentBase: publicDirName,
      port: 4000,
      compress: true,
      hot: true,
    },
    optimization: {
      minimize: !isDev,
    },
  } as webpack.Configuration
}
