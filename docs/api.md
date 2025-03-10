# API接口文档

## 基础信息
- 基础路径: `/api/v1`
- 响应格式: JSON
- 认证方式: Bearer Token

## 通用响应格式
```json
{
    "code": 0,       // 状态码：0-成功，非0-失败
    "msg": "success", // 提示信息
    "data": {}       // 响应数据
}
```

## 商品相关接口

### 1. 获取商品列表
```
GET /products

请求参数：
- page: 页码，默认1
- limit: 每页数量，默认10
- category: 商品分类
- keyword: 搜索关键词
- sort: 排序方式(price_asc/price_desc/sales_desc)

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "total": 100,
        "items": [
            {
                "id": 1,
                "name": "蝴蝶飞舞按摩器",
                "price": 267.00,
                "description": "强震静音，异地互动...",
                "images": ["url1", "url2"],
                "stock": 99,
                "category": "按摩器",
                "tags": ["热销", "新品"],
                "sales": 50,
                "specs": [...],
                "skus": [...]
            }
        ]
    }
}
```

### 2. 获取商品详情
```
GET /products/:id

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": 1,
        "name": "蝴蝶飞舞按摩器",
        "price": 267.00,
        "description": "强震静音，异地互动...",
        "images": ["url1", "url2"],
        "stock": 99,
        "category": "按摩器",
        "tags": ["热销", "新品"],
        "sales": 50,
        "specs": [
            {
                "name": "颜色",
                "values": ["粉色", "紫色", "黑色"]
            },
            {
                "name": "震动模式",
                "values": ["标准版", "高级版"]
            }
        ],
        "skus": [
            {
                "id": "1-1",
                "specs": ["粉色", "标准版"],
                "price": 267.00,
                "stock": 30
            }
        ]
    }
}
```

## 购物车相关接口

### 1. 添加商品到购物车
```
POST /cart/add

请求参数：
{
    "product_id": 1,
    "sku_id": "1-1",
    "quantity": 1
}

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "cart_count": 1
    }
}
```

### 2. 获取购物车列表
```
GET /cart/list

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "total_price": 267.00,
        "items": [
            {
                "id": 1,
                "product_id": 1,
                "sku_id": "1-1",
                "name": "蝴蝶飞舞按摩器",
                "price": 267.00,
                "quantity": 1,
                "specs": ["粉色", "标准版"],
                "image": "url1"
            }
        ]
    }
}
```

## 订单相关接口

### 1. 创建订单
```
POST /orders/create

请求参数：
{
    "products": [
        {
            "product_id": 1,
            "sku_id": "1-1",
            "quantity": 1
        }
    ],
    "address": {
        "name": "张三",
        "phone": "13800138000",
        "province": "广东省",
        "city": "深圳市",
        "district": "南山区",
        "detail": "科技园1号"
    }
}

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "order_no": "202503101234567",
        "total_price": 267.00
    }
}
```

### 2. 获取订单列表
```
GET /orders/list

请求参数：
- page: 页码，默认1
- limit: 每页数量，默认10
- status: 订单状态(可选)

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "total": 10,
        "items": [
            {
                "order_no": "202503101234567",
                "total_price": 267.00,
                "status": 0,
                "created_at": "2025-03-10 12:34:56",
                "products": [
                    {
                        "name": "蝴蝶飞舞按摩器",
                        "price": 267.00,
                        "quantity": 1,
                        "specs": ["粉色", "标准版"],
                        "image": "url1"
                    }
                ]
            }
        ]
    }
}
```

## 用户相关接口

### 1. 用户登录
```
POST /user/login

请求参数：
{
    "username": "admin",
    "password": "123456"
}

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs...",
        "user": {
            "id": 1,
            "username": "admin",
            "role": "admin",
            "avatar": "url"
        }
    }
}
```

### 2. 获取用户信息
```
GET /user/info

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": {
        "id": 1,
        "username": "admin",
        "role": "admin",
        "avatar": "url",
        "phone": "13800138000"
    }
}
```

## 轮播图相关接口

### 1. 获取轮播图列表
```
GET /banners

响应示例：
{
    "code": 0,
    "msg": "success",
    "data": [
        {
            "id": 1,
            "image": "url1",
            "link": "http://...",
            "sort": 1
        }
    ]
}
``` 