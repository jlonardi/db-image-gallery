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
    },
    'plugins': [
        'react'
    ]
};
