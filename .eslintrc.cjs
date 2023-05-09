module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended"
    ],
    "settings": {
        'import/resolver': {
            alias: {
                map: { '@': './src' }
            }
        }
    },
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",    // 关闭any类型报错
        "vue/multi-word-component-names": "off",        // 关闭组件名必须是多个单词的
        "@typescript-eslint/no-var-requires": "off",    // 关闭require报错
    },
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@typescript-eslint/recommended",
    ]
}
