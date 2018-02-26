module.exports = {
  "plugins": [
    // es6 引入规范
    "babel"
  ],
  "parser": "babel-eslint",
  "root": true,

  // 引用一些成熟的规则方案
  "extends": [
    "mingelz",
    "mingelz/rules/react",
  ],

  // 特殊的全局变量
  "globals": {
  },

  // 环境
  "env": {
    "browser": true,
    "node": true,
  },

  // 项目规则，应尽量使用 extends/plugins 规则，添加 rules 前请三思
  "rules": {
    // 舍弃原生 no-invalid-this 用 es6 规则的
    "babel/no-invalid-this": 1,
    "no-invalid-this": 0,
    "class-methods-use-this": [2,
      {
        "exceptMethods": ["render"]
      }
    ],
    "max-lines": 0,
    "complexity": 0,
  },
}
