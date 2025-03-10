-- 插入测试商品数据
INSERT INTO products (name, price, description, images, stock, category, tags, specs, skus) VALUES
(
    '蝴蝶飞舞按摩器',
    267.00,
    '强震静音，异地互动，多种模式，精致小巧，USB充电，防水设计',
    JSON_ARRAY(
        'https://example.com/images/product1_1.jpg',
        'https://example.com/images/product1_2.jpg',
        'https://example.com/images/product1_3.jpg'
    ),
    99,
    '按摩器',
    JSON_ARRAY('热销', '新品'),
    JSON_OBJECT(
        'specs', JSON_ARRAY(
            JSON_OBJECT('name', '颜色', 'values', JSON_ARRAY('粉色', '紫色', '黑色')),
            JSON_OBJECT('name', '震动模式', 'values', JSON_ARRAY('标准版', '高级版'))
        )
    ),
    JSON_OBJECT(
        'skus', JSON_ARRAY(
            JSON_OBJECT(
                'id', '1-1',
                'specs', JSON_ARRAY('粉色', '标准版'),
                'price', 267.00,
                'stock', 30
            ),
            JSON_OBJECT(
                'id', '1-2',
                'specs', JSON_ARRAY('粉色', '高级版'),
                'price', 367.00,
                'stock', 20
            ),
            JSON_OBJECT(
                'id', '1-3',
                'specs', JSON_ARRAY('紫色', '标准版'),
                'price', 267.00,
                'stock', 25
            ),
            JSON_OBJECT(
                'id', '1-4',
                'specs', JSON_ARRAY('紫色', '高级版'),
                'price', 367.00,
                'stock', 15
            )
        )
    )
),
(
    '魅惑之夜套装',
    499.00,
    '精美礼盒，情趣内衣，丝袜，眼罩，手铐等多件套',
    JSON_ARRAY(
        'https://example.com/images/product2_1.jpg',
        'https://example.com/images/product2_2.jpg'
    ),
    50,
    '情趣套装',
    JSON_ARRAY('畅销', '优惠'),
    JSON_OBJECT(
        'specs', JSON_ARRAY(
            JSON_OBJECT('name', '尺码', 'values', JSON_ARRAY('S', 'M', 'L')),
            JSON_OBJECT('name', '颜色', 'values', JSON_ARRAY('红色', '黑色'))
        )
    ),
    JSON_OBJECT(
        'skus', JSON_ARRAY(
            JSON_OBJECT(
                'id', '2-1',
                'specs', JSON_ARRAY('S', '红色'),
                'price', 499.00,
                'stock', 10
            ),
            JSON_OBJECT(
                'id', '2-2',
                'specs', JSON_ARRAY('M', '红色'),
                'price', 499.00,
                'stock', 20
            )
        )
    )
);

-- 插入测试轮播图数据
INSERT INTO banners (image, link, sort, status) VALUES
('https://example.com/banners/banner1.jpg', '/products/1', 1, 1),
('https://example.com/banners/banner2.jpg', '/products/2', 2, 1),
('https://example.com/banners/banner3.jpg', '/category/hot', 3, 1);

-- 插入测试用户数据
INSERT INTO users (username, password, role, avatar, phone) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'admin', 'https://example.com/avatar/admin.jpg', '13800138000'),
('user1', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'user', 'https://example.com/avatar/user1.jpg', '13800138001'); 