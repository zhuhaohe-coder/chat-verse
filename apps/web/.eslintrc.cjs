module.exports = {
  // 解析器选项
  parserOptions: {
    project: './tsconfig.json',     // 使用 web 应用的 tsconfig
    tsconfigRootDir: __dirname,
  },

  // 继承配置
  extends: [
    '../../.eslintrc.cjs',           // 继承根配置
    'plugin:react/recommended',      // React 推荐规则
    'plugin:react-hooks/recommended' // React Hooks 推荐规则
  ],

  // 环境配置
  env: {
    browser: true,                  // 浏览器环境
    es2020: true
  },

  // 插件
  plugins: [
    'react',                        // React 插件
    'react-hooks',                  // React Hooks 插件
    'react-refresh'                 // React Refresh 插件
  ],

  // 规则配置
  rules: {
    'react/react-in-jsx-scope': 'off',    // 不需要在 JSX 中导入 React
    'react/prop-types': 'off',            // 不检查 PropTypes
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  },

  // 设置
  settings: {
    react: {
      version: 'detect'             // 自动检测 React 版本
    }
  }
};
