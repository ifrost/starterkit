module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "dist/starterkit.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};