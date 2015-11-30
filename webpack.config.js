var path = require('path');
module.exports = {
    context: __dirname + path.sep + 'app',
    entry: ['./index.js'],
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    }
};