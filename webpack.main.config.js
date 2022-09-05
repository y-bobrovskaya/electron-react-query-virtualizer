
module.exports = {
    // mode: prod ? 'production' : 'development',
    entry: './src/index.ts',
    // output: {
    //     path: __dirname + '/public/',
    // },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'],
                },
                use: 'ts-loader',
            },
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader'],
            // },
        ]
    },
    // devtool: prod ? undefined : 'source-map',
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: 'index.html',
    //     }),
    //     new MiniCssExtractPlugin(), // ?
    // ],
};
