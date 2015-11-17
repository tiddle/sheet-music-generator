module.exports = {
    context: __dirname + '/app',
    entry: ['webpack/hot/dev-server', './index.js'],
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    }
};