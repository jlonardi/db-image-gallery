module.exports = {
    'extends': 'airbnb',
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true
        }
    },
    'rules': {
        // disable requiring trailing commas because it might be nice to revert to
        // being JSON at some point, and I don't want to make big changes now.
        'comma-dangle': 0,
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-closing-bracket-location': [0, 'props-aligned'],
        'indent': [2, 4, { 'SwitchCase': 1 }],
        'global-require': 0
    },
    'plugins': [
        'react'
    ],
    // Custom Globals
    "globals": { // additional predefined global variables
        "require": true,
        "arguments": true
    },
    // Environments
    "env": {
        "es6": true,
        "browser": true, // Web Browser (window, document, etc)
        "jasmine": false, // Jasmine
        "jquery": false, // jQuery
        "mocha": true, // Mocha
        "node": true, // Node.js
        "prototypejs": false, // Prototype and Scriptaculous
        "qunit": false, // QUnit
        "shelljs": false, // ShellJS
        "worker": false // Web Workers
    },
};
