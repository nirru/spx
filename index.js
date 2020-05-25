require( "@babel/register" )( {
    presets: [ "@babel/env" ],
    plugins: [
        [
            "css-modules-transform",
            {
                camelCase: true,
                extensions: [ ".css", ".scss" ],
            },
        ],
        ["@babel/plugin-transform-modules-commonjs", {
            "allowTopLevelThis": true
        }],
        "dynamic-import-node-babel-7",
    ],
} );
require( "./src/server" );


