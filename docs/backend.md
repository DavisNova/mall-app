# 后端项目配置文档

## 项目结构
```
server/
  ├── api/              # API接口目录
  │   ├── products.ts   # 商品相关接口
  │   ├── banners.ts    # 轮播图相关接口
  │   ├── cart.ts       # 购物车相关接口
  │   ├── orders.ts     # 订单相关接口
  │   └── users.ts      # 用户相关接口
  ├── db/               # 数据库相关
  │   ├── config.ts     # 数据库配置
  │   ├── models/       # 数据模型
  │   └── migrations/   # 数据库迁移文件
  ├── middleware/       # 中间件
  │   ├── auth.ts       # 认证中间件
  │   └── error.ts      # 错误处理中间件
  ├── utils/           # 工具函数
  └── websocket.ts     # WebSocket服务
```

## 技术栈
- Node.js + Express
- TypeScript
- MySQL
- WebSocket

## 环境要求
- Node.js >= 14.0.0
- MySQL >= 8.0
- TypeScript >= 4.0.0

## 数据库配置
```typescript
// db/config.ts
export default {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'mall',
  charset: 'utf8mb4'
}
```

## API 错误码
```typescript
enum ErrorCode {
  SUCCESS = 0,
  PARAM_ERROR = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}
```

## 开发步骤
1. 安装依赖
```bash
cd server
npm install
```

2. 配置数据库
- 创建数据库：mall
- 执行 docs/database.md 中的建表语句
- 执行 docs/init_data.sql 中的初始数据

3. 启动服务
```bash
npm run dev
```

## 部署
1. 构建
```bash
npm run build
```

2. 启动
```bash
npm run start
``` 