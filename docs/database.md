# 数据库设计文档

## 商品表(products)

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT '商品名称',
    price DECIMAL(10,2) NOT NULL COMMENT '商品价格',
    description TEXT COMMENT '商品描述',
    images JSON COMMENT '商品图片列表',
    stock INT NOT NULL DEFAULT 0 COMMENT '库存数量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    category VARCHAR(50) COMMENT '商品分类',
    tags JSON COMMENT '商品标签',
    sales INT DEFAULT 0 COMMENT '销量',
    status TINYINT DEFAULT 1 COMMENT '状态：0-下架，1-上架',
    specs JSON COMMENT '商品规格',
    skus JSON COMMENT '商品SKU'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 商品规格示例
{
    "specs": [
        {
            "name": "颜色",
            "values": ["粉色", "紫色", "黑色"]
        },
        {
            "name": "震动模式",
            "values": ["标准版", "高级版"]
        }
    ]
}

-- 商品SKU示例
{
    "skus": [
        {
            "id": "1-1",
            "specs": ["粉色", "标准版"],
            "price": 267.00,
            "stock": 30
        },
        {
            "id": "1-2",
            "specs": ["粉色", "高级版"],
            "price": 367.00,
            "stock": 20
        }
    ]
}
```

## 订单表(orders)

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    order_no VARCHAR(32) NOT NULL COMMENT '订单编号',
    total_price DECIMAL(10,2) NOT NULL COMMENT '订单总价',
    status TINYINT DEFAULT 0 COMMENT '订单状态：0-待付款，1-待发货，2-已发货，3-已完成，4-已取消',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    address JSON COMMENT '收货地址',
    payment_status TINYINT DEFAULT 0 COMMENT '支付状态：0-未支付，1-已支付',
    shipping_status TINYINT DEFAULT 0 COMMENT '发货状态：0-未发货，1-已发货，2-已收货',
    products JSON COMMENT '订单商品信息'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- 订单商品信息示例
{
    "products": [
        {
            "id": 1,
            "sku_id": "1-1",
            "name": "蝴蝶飞舞按摩器",
            "price": 267.00,
            "quantity": 1,
            "specs": ["粉色", "标准版"]
        }
    ]
}
```

## 购物车表(carts)

```sql
CREATE TABLE carts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    sku_id VARCHAR(32) NOT NULL COMMENT 'SKU ID',
    quantity INT NOT NULL DEFAULT 1 COMMENT '数量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    selected TINYINT DEFAULT 1 COMMENT '是否选中：0-未选中，1-选中'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车表';
```

## 用户表(users)

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    role VARCHAR(20) DEFAULT 'user' COMMENT '角色：user-普通用户，admin-管理员',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    avatar VARCHAR(255) COMMENT '头像',
    phone VARCHAR(20) COMMENT '手机号',
    last_login TIMESTAMP COMMENT '最后登录时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

## 轮播图表(banners)

```sql
CREATE TABLE banners (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL COMMENT '图片URL',
    link VARCHAR(255) COMMENT '跳转链接',
    sort INT DEFAULT 0 COMMENT '排序',
    status TINYINT DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='轮播图表';
```

## 索引设计

```sql
-- 商品表索引
ALTER TABLE products ADD INDEX idx_category (category);
ALTER TABLE products ADD INDEX idx_status (status);
ALTER TABLE products ADD INDEX idx_created_at (created_at);

-- 订单表索引
ALTER TABLE orders ADD UNIQUE INDEX idx_order_no (order_no);
ALTER TABLE orders ADD INDEX idx_user_id (user_id);
ALTER TABLE orders ADD INDEX idx_status (status);
ALTER TABLE orders ADD INDEX idx_created_at (created_at);

-- 购物车表索引
ALTER TABLE carts ADD INDEX idx_user_id (user_id);
ALTER TABLE carts ADD INDEX idx_product_id (product_id);

-- 用户表索引
ALTER TABLE users ADD UNIQUE INDEX idx_username (username);
ALTER TABLE users ADD INDEX idx_phone (phone);

-- 轮播图表索引
ALTER TABLE banners ADD INDEX idx_status (status);
ALTER TABLE banners ADD INDEX idx_sort (sort);
``` 