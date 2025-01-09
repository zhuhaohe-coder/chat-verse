module.exports = {
  // 指定解析器
  parser: '@typescript-eslint/parser',

  // 解析器选项
  parserOptions: {
    ecmaVersion: 2020, // 使用的 ECMAScript 版本
    sourceType: 'module', // 代码是 ECMAScript 模块
  },

  // 扩展其他配置
  extends: [
    'eslint:recommended', // ESLint 推荐规则
    'plugin:@typescript-eslint/recommended', // TypeScript 推荐规则
    'plugin:prettier/recommended', // Prettier 推荐规则
  ],

  // 环境配置
  env: {
    node: true, // Node.js 全局变量
    browser: true, // 浏览器全局变量
    es2020: true, // 启用 ES2020 特性
  },

  // 插件
  plugins: [
    '@typescript-eslint', // TypeScript 插件
  ],

  // 共享设置
  settings: {
    // 导入解析器设置
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // 总是尝试查找类型定义
      },
    },
  },

  // 规则配置
  rules: {
    // TypeScript 相关规则
    '@typescript-eslint/explicit-function-return-type': 'off', // 不要求显式返回类型
    '@typescript-eslint/no-explicit-any': 'warn', // 警告使用 any 类型
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // 未使用变量检查
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // 通用规则
    'no-console': ['warn', { allow: ['warn', 'error'] }], // 限制 console 使用
    'prefer-const': 'error', // 优先使用 const
    'no-duplicate-imports': 'error', // 禁止重复导入
  },

  // 忽略的文件
  ignorePatterns: [
    'dist', // 构建输出目录
    'node_modules', // 依赖目录
    '*.config.js', // 配置文件
    '*.d.ts', // 类型声明文件
  ],

  // 根配置标志
  root: true, // 标记为根级配置文件
};
