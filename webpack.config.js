const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (env, argv) => {
    const isDevelopment = !(argv.mode == 'production')
    return ({
        entry: './src/index.tsx',
        output: {
            publicPath: "/",
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        mode: isDevelopment ? 'development' : 'production',
        resolve: {
            extensions: [ '.js', '.ts', '.tsx' ]
        },
        devServer: {
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: 'body',
                template: './public/index.html'
            })
        ]
    })
}