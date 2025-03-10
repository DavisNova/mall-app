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

首页前端显示的所有商品均从后端数据库中拿取商品数据然后进行展示
需要后端有对应的商品数据库,商品的信息参考当前的前端配置

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
- Node.js + Express
- TypeScript
- MySQL 数据库
- WebSocket 实时通讯

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
├── docs/                    # 项目文档
│   ├── api.md              # API接口文档
│   ├── database.md         # 数据库设计文档
│   └── init_data.sql       # 初始数据
├── server/                  # 后端服务
│   ├── api/                # API路由
│   ├── db/                 # 数据库配置
│   └── websocket.ts        # WebSocket服务
├── components/             # 前端组件
├── pages/                 # 页面文件
├── stores/                # 状态管理
├── layouts/               # 布局文件
└── public/                # 静态资源
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

## 部署指南（宝塔面板）

### 1. 环境要求
- Node.js >= 16
- MySQL >= 8.0
- Nginx
- PM2

### 2. 宝塔面板配置步骤

#### 2.1 安装必要软件
1. 在宝塔面板中安装以下软件：
   - Nginx
   - MySQL
   - PM2管理器
   - Node.js版本管理器

2. 使用Node.js版本管理器安装Node.js 16：
   ```bash
   # 在宝塔终端中执行
   n install 16
   ```

#### 2.2 创建数据库
1. 在宝塔面板中打开"数据库"
2. 创建MySQL数据库：
   - 数据库名：mall
   - 用户名：mall
   - 密码：mall
   - 访问权限：所有人
   
3. 导入数据库文件：
   ```sql
   # 在数据库管理界面导入以下文件：
   docs/database.md   # 创建表结构
   docs/init_data.sql # 导入初始数据
   ```

#### 2.3 部署后端服务
1. 在宝塔面板中添加网站：
   - 域名：api.你的域名.com（或者使用子目录 /api）
   - 网站目录：/www/wwwroot/mall-app/server
   
2. 克隆项目：
   ```bash
   cd /www/wwwroot/
   git clone https://github.com/DavisNova/mall-app.git
   cd mall-app/server
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

4. 创建环境配置文件：
   ```bash
   # 创建 .env 文件
   cat > .env << EOF
   DB_HOST=localhost
   DB_USER=mall
   DB_PASSWORD=mall
   DB_NAME=mall
   DB_PORT=3306
   PORT=3000
   NODE_ENV=production
   EOF
   ```

5. 使用PM2启动服务：
   ```bash
   # 创建 ecosystem.config.js
   cat > ecosystem.config.js << EOF
   module.exports = {
     apps: [{
       name: 'mall-server',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production'
       }
     }]
   }
   EOF
   
   # 启动服务
   pm2 start ecosystem.config.js
   ```

#### 2.4 部署前端服务
1. 在宝塔面板中添加网站：
   - 域名：你的域名.com
   - 网站目录：/www/wwwroot/mall-app/.output/public

2. 构建前端项目：
   ```bash
   cd /www/wwwroot/mall-app
   npm install
   npm run build
   ```

3. 配置Nginx：
   ```nginx
   # 在网站设置中修改Nginx配置
   server {
     listen 80;
     server_name 你的域名.com;
     
     # 前端文件
     location / {
       root /www/wwwroot/mall-app/.output/public;
       index index.html;
       try_files $uri $uri/ /index.html;
     }
     
     # API代理
     location /api/ {
       proxy_pass http://localhost:3000/;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

### 3. 更新部署
当需要更新代码时：
```bash
cd /www/wwwroot/mall-app
git pull
npm install
npm run build

cd server
npm install
pm2 restart mall-server
```

### 4. 注意事项
1. 确保所有端口（80, 3000）在防火墙中已开放
2. 配置SSL证书以启用HTTPS
3. 定期备份数据库
4. 检查日志：`pm2 logs mall-server`

### 5. 常见问题
1. 502错误：检查PM2服务是否正常运行
2. 数据库连接失败：检查数据库配置和权限
3. 静态资源404：检查Nginx配置和目录权限

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

## 核心功能

### 1. 商品展示
- 商品列表展示（分页加载）
- 商品分类筛选
- 商品搜索
- 商品详情展示
- 商品规格选择

### 2. 购物车
- 添加商品到购物车
- 修改商品数量
- 删除购物车商品
- 购物车商品统计

### 3. 订单管理
- 创建订单
- 订单列表
- 订单详情
- 订单状态跟踪

### 4. 在线客服
- 实时聊天
- 图片发送
- 客服管理后台
- 快捷回复

## 开发指南

### 1. 环境要求
- Node.js >= 16
- MySQL >= 8.0

### 2. 安装依赖
```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server && npm install
```

### 3. 数据库配置
1. 创建数据库
```sql
CREATE DATABASE mall CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

2. 导入表结构
```bash
mysql -u root -p mall < docs/database.md
```

3. 导入初始数据
```bash
mysql -u root -p mall < docs/init_data.sql
```

### 4. 启动服务
```bash
# 启动前端开发服务器
npm run dev

# 启动后端服务器
cd server && npm run dev
```

## API文档

详细的API接口文档请参考 `docs/api.md`

## 数据库设计

数据库表结构设计请参考 `docs/database.md`
