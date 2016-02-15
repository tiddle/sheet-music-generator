var path = require('path');
module.exports = {
    context: __dirname + path.sep + 'app',
    module: {
		loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
		]
	},
    externals: {
        'vextabaa': 'vextab/releases/vextab-div'
    },
    entry: ['./index.js'],
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    }
};