# 移动端商城系统

基于 Nuxt 3 开发的现代化移动端商城系统，采用前后端分离架构。

## 项目概述

本项目是一个专注于移动端体验的电商平台，采用最新的前端技术栈，提供流畅的用户体验和完整的电商功能。

## 核心需求

### 1. 移动端优先设计
- 专门为手机设计的UI/UX
- 优先保证手机端显示和排版正常
- 采用响应式设计确保各种尺寸设备的适配

### 2. 主页面布局
- 顶部区域：横幅/轮播图展示区
- 中间区域：商品网格展示（每行3个商品）
- 底部固定导航栏：
  - 客服聊天按钮
  - 购物车按钮（显示总价）
  - 其他导航功能

### 3. 商品展示模块
- 商品图片展示
- 商品名称显示
- 商品价格显示
- 自上而下的垂直排列方式

### 4. 商品详情页
- 商品图片画廊
- 商品基本信息
- 数量选择器（带加减按钮）
- 功能按钮组：
  - 客服聊天
  - 加入购物车
  - 立即购买

### 5. 客服系统
- 实时聊天功能
- 图片发送支持
- 客服后台管理界面
- 用户-客服实时对话

### 6. 购物车功能
- 商品列表展示
- 数量调整功能
- 总价实时计算
- 一键下单功能

### 7. 订单系统
- 商品清单展示
- 人工支付流程
- 客服确认机制

### 8. 后台管理
- 横幅/轮播图管理
- 商品信息管理
- 订单管理
- 客服系统管理

## 技术栈

### 前端技术
- Nuxt 3 (Vue 3 + Vite)
- TypeScript
- Pinia 状态管理
- TailwindCSS 样式框架
- Socket.io-client 实时通讯
- VueUse 工具集
- Vant UI 移动端组件库

### 后端技术
- Node.js
- Express/Koa
- WebSocket
- MongoDB
- Redis (用于会话管理和缓存)

## 系统架构

### 前端架构
1. 页面布局
   - 自适应布局设计（rem单位）
   - 固定底部导航栏（fixed定位）
   - 商品网格布局（Grid/Flex）
   - 页面过渡动画

2. 核心页面
   - 首页（轮播图 + 商品列表）
   - 商品详情页
   - 购物车页面
   - 订单页面
   - 客服聊天页面
   - 后台管理页面

### 后端架构
1. 数据库设计
   ```
   - 用户表(users)
     - _id: ObjectId
     - username: String
     - password: String
     - role: String (user/admin)
     - created_at: Date
     - avatar: String
     - phone: String
     - last_login: Date

   - 商品表(products)
     - _id: ObjectId
     - name: String
     - price: Number
     - description: String
     - images: Array
     - stock: Number
     - created_at: Date
     - category: String
     - tags: Array
     - sales: Number
     - status: String

   - 订单表(orders)
     - _id: ObjectId
     - user_id: ObjectId
     - products: Array
     - total_price: Number
     - status: String
     - created_at: Date
     - address: Object
     - payment_status: String
     - shipping_status: String

   - 购物车表(carts)
     - _id: ObjectId
     - user_id: ObjectId
     - products: Array
     - created_at: Date

   - 聊天记录表(messages)
     - _id: ObjectId
     - from_id: ObjectId
     - to_id: ObjectId
     - content: String
     - type: String
     - created_at: Date
     - image_url: String
     - status: String (read/unread)

   - 轮播图表(banners)
     - _id: ObjectId
     - image: String
     - link: String
     - sort: Number
     - status: String
     - created_at: Date
   ```

2. API设计
   - RESTful API
   - WebSocket 实时通讯

## 功能实现细节

### 1. 首页实现
- 使用Swiper实现轮播图
- 使用Grid布局实现商品列表
- 使用Intersection Observer实现无限滚动
- 固定底部导航栏使用fixed定位
- 自定义骨架屏优化加载体验
- 图片懒加载优化
- 下拉刷新功能
- 商品分类快速过滤

### 2. 商品详情
- 图片查看器支持放大缩小
- 商品数量选择器
- 加入购物车动画效果
- 客服咨询按钮
- 商品图片预加载
- 规格选择功能
- 相关商品推荐
- 分享功能

### 3. 购物车系统
- 实时价格计算
- 商品数量修改
- 本地存储+数据库同步
- 下单流程优化
- 离线购物车功能
- 商品库存实时校验
- 失效商品处理
- 购物车商品同步机制

### 4. 客服系统
- WebSocket实时通讯
- 图片发送功能
- 消息历史记录
- 在线状态显示
- 消息提醒机制
- 客服状态管理
- 消息撤回功能
- 快捷回复功能

### 5. 订单系统
- 订单创建和确认
- 订单状态跟踪
- 支付流程（人工确认）
- 订单状态实时更新
- 订单超时处理
- 订单记录导出
- 订单评价功能

### 6. 后台管理
- 商品管理CRUD
- 轮播图管理
- 订单管理
- 客服消息管理
- 数据统计分析
- 用户行为分析
- 销售报表生成
- 系统日志记录

## 开发流程

1. 环境搭建
```bash
npm install
```

2. 开发服务器
```bash
npm run dev
```

3. 生产构建
```bash
npm run build
```

## 项目结构
```
mall-app/
├── components/      # 组件目录
│   ├── common/     # 通用组件
│   ├── layout/     # 布局组件
│   └── business/   # 业务组件
├── pages/          # 页面目录
│   ├── index.vue   # 首页
│   ├── product/    # 商品相关页面
│   ├── cart/       # 购物车页面
│   ├── order/      # 订单相关页面
│   ├── chat/       # 聊天相关页面
│   └── admin/      # 后台管理页面
├── layouts/        # 布局目录
├── stores/         # 状态管理
├── composables/    # 组合式函数
├── server/         # 服务端API
│   ├── api/        # API路由
│   ├── models/     # 数据模型
│   ├── config/     # 配置文件
│   └── utils/      # 工具函数
├── public/         # 静态资源
└── types/          # TypeScript类型
```

## 性能优化
1. 首屏加载优化
   - 路由懒加载
   - 组件按需加载
   - 图片优化处理
   - 静态资源CDN

2. 运行时优化
   - 虚拟列表
   - 防抖节流
   - 数据缓存
   - 预加载策略

3. 体验优化
   - 骨架屏
   - 页面过渡
   - 加载动画
   - 手势操作

## 安全措施
1. 前端安全
   - XSS防护
   - CSRF防护
   - 敏感信息加密
   - 输入验证

2. 后端安全
   - 数据加密
   - 权限控制
   - 日志记录
   - 防SQL注入

## 部署说明
1. 开发环境
   - Node.js >= 16.10
   - MongoDB >= 4.4
   - Redis >= 6.0

2. 部署步骤
   - 环境准备
   - 依赖安装
   - 配置修改
   - 构建部署

## 测试规范
1. 单元测试
2. 集成测试
3. E2E测试
4. 性能测试

## 注意事项
1. 移动端适配采用rem布局
2. 图片需要进行懒加载和优化
3. 所有API请求需要做好错误处理
4. 注意数据安全和用户隐私保护
5. 保持代码规范和文档更新

## 开发规范
1. 代码规范遵循ESLint配置
2. 提交信息遵循Conventional Commits
3. 组件采用Composition API
4. 类型定义规范遵循TypeScript
