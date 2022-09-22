
module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        // Add this next line to configure ESLint for Jest, see:
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    jest: true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-var-requires': 'off'
        
    }
}
