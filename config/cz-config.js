module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     ✨ 新功能' },
    { value: 'fix', name: 'fix:      🐛 修复bug' },
    { value: 'docs', name: 'docs:     📝 文档变更' },
    { value: 'style', name: 'style:    💄 代码格式(不影响代码运行的变动)' },
    { value: 'refactor', name: 'refactor: ♻️  重构(既不是增加feature，也不是修复bug)' },
    { value: 'perf', name: 'perf:     ⚡️ 性能优化' },
    { value: 'test', name: 'test:     ✅ 增加测试' },
    { value: 'chore', name: 'chore:    🔨 构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   ⏪️ 回退' },
    { value: 'build', name: 'build:    📦️ 打包' },
    { value: 'ci', name: 'ci:       🎡 CI相关变更' },
  ],

  // 启用项目选择
  useProjectScopes: true,

  // 步骤
  messages: {
    type: '请选择提交类型:',
    project: '请选择项目类型(可选):',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
  },

  // 跳过问题
  skipQuestions: ['body', 'footer'],

  // subject文字长度默认是72
  subjectLimit: 100,

  // 项目类型选择
  projects: [
    { value: 'frontend', name: 'frontend: 前端项目更改' },
    { value: 'backend', name: 'backend:  后端项目更改' },
    { value: 'common', name: 'common:  公共库更改' },
  ],

  // 范围列表
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义'],
  ].map(([value, description]) => ({
    value,
    name: `${value.padEnd(30)} (${description})`,
  })),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  allowCustomScopes: true,

  // 允许打断的提交
  allowBreakingChanges: ['feat', 'fix'],
};
