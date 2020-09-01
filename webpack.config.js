const path = require('path');

module.exports = {
    mode: "development",
    entry: "./demo/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        "transpileOnly": true
                    }
                }
            }
        ]
    },
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    }
}
