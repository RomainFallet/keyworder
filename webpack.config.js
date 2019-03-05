const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'app.js',
        path: __dirname + '/dist',
    },
    devtool: 'inline-source-map',
    target: 'node',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    externals: [nodeExternals()],
    module: {
        rules: [{ test: /\.ts$/, use: 'ts-loader' }],
    }
};
