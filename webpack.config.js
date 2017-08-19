const path = require('path');

module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        filename: 'starterkit.js',
        libraryTarget: "umd",
        path: path.resolve(__dirname, 'dist')
    }
};