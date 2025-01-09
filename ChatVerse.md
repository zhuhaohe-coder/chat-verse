# ChatVerse（语聊）

## 架构

`pnpm workspace` 实现`monorepo`架构



```bash
my-project/
├── apps/
│   ├── web/           # Web 应用
│   └── server/         # 管理后台
├── packages/
│   ├── ui/           # UI 组件库
│   ├── utils/        # 工具函数
│   └── api/          # API 接口
└── pnpm-workspace.yaml
```

