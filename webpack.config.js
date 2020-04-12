const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    console.log('TEST NODE_ENV: ', env.NODE_ENV)
    return {
        entry: {
            app: ['./src/index.tsx'],
            vendor: ['react', 'react-dom']
        },
        output: {
            path: env.NODE_ENV === 'production' ? path.resolve(__dirname, 'public') : path.resolve(__dirname, 'development'),
            filename: env.NODE_ENV === 'production' ? './js/[name].[chunkhash].js' : './js/[name].js'
        },
        devtool: env.NODE_ENV !== 'production' ? 'none':'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    },
                },
                {
                    test: /\.(s*)css$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV) })
        ],
        devServer: {
            contentBase: path.join(__dirname, './')
        }
    }
}