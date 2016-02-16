var path = require('path');

module.exports = {
    context: __dirname + path.sep + 'app',
    module: {
		loaders: [
            { test: /\.vextab-div.js$/, loader: 'script'}
		]
	},
    externals: {
        'vextabaa': 'vextab/releases/vextab-div'
    },
    devtool: 'source-map',
    entry: ['./index.js'],
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    }
};