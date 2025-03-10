<template>
  <div class="home-page">
    <!-- 顶部渐变背景 -->
    <div class="top-gradient"></div>

    <!-- 轮播图 -->
    <van-swipe class="banner" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in bannerImages" :key="image">
        <div class="banner-wrapper shimmer">
          <img :src="image" class="banner-image" />
          <div class="banner-overlay"></div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类标签 -->
    <div class="category-tags">
      <div v-for="tag in tags" :key="tag" class="tag-item shimmer">
        {{ tag }}
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="products-grid">
      <div v-for="product in products" 
           :key="product.id" 
           class="product-card shimmer"
           @click="showProductDetail(product)">
        <div class="product-image-wrapper">
          <van-image
            :src="product.images[0]"
            class="product-image"
            fit="cover"
            lazy-load
          />
          <div class="product-overlay">
            <van-icon name="eye-o" size="20" />
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">¥{{ product.price }}</div>
        </div>
      </div>
    </div>

    <!-- 商品详情弹窗 -->
    <ProductDetail
      v-model:show="showDetail"
      :product="selectedProduct"
      @add-to-cart="handleAddToCart"
      @buy-now="handleBuyNow"
      @service="handleService"
    />
  </div>
</template>

<script setup lang="ts">
import ProductDetail from '~/components/ProductDetail.vue'
import { useCartStore } from '~/stores/cart'

// 模拟数据
const bannerImages = [
  'https://example.com/banner1.jpg',
  'https://example.com/banner2.jpg',
]

const tags = ['热门', '新品', '特惠', '限定']

const products = [
  {
    id: 1,
    name: '蝴蝶飞舞按摩器',
    price: 267.00,
    description: '强震静音，异地互动，APP远程控制，多种模式切换，USB充电，防水设计',
    images: [
      'https://example.com/product1-1.jpg',
      'https://example.com/product1-2.jpg',
    ],
    stock: 99,
    specs: [
      {
        name: '颜色',
        values: ['粉色', '紫色', '黑色']
      },
      {
        name: '震动模式',
        values: ['标准版', '高级版']
      }
    ],
    skus: [
      {
        id: '1-1',
        specs: ['粉色', '标准版'],
        price: 267.00,
        stock: 30
      },
      {
        id: '1-2',
        specs: ['粉色', '高级版'],
        price: 367.00,
        stock: 20
      },
      {
        id: '1-3',
        specs: ['紫色', '标准版'],
        price: 267.00,
        stock: 25
      },
      {
        id: '1-4',
        specs: ['紫色', '高级版'],
        price: 367.00,
        stock: 15
      },
      {
        id: '1-5',
        specs: ['黑色', '标准版'],
        price: 267.00,
        stock: 5
      },
      {
        id: '1-6',
        specs: ['黑色', '高级版'],
        price: 367.00,
        stock: 4
      }
    ]
  },
  {
    id: 2,
    name: '魅惑之夜套装',
    price: 288.00,
    description: '15件套精美情趣套装，丝滑材质，舒适贴身，让你的夜晚更加精彩',
    images: [
      'https://example.com/product2-1.jpg',
      'https://example.com/product2-2.jpg',
    ],
    stock: 50,
    specs: [
      {
        name: '尺码',
        values: ['S', 'M', 'L']
      },
      {
        name: '款式',
        values: ['性感蕾丝', '清纯甜美']
      }
    ],
    skus: [
      {
        id: '2-1',
        specs: ['S', '性感蕾丝'],
        price: 288.00,
        stock: 10
      },
      {
        id: '2-2',
        specs: ['M', '性感蕾丝'],
        price: 288.00,
        stock: 15
      },
      {
        id: '2-3',
        specs: ['L', '性感蕾丝'],
        price: 288.00,
        stock: 8
      },
      {
        id: '2-4',
        specs: ['S', '清纯甜美'],
        price: 288.00,
        stock: 12
      },
      {
        id: '2-5',
        specs: ['M', '清纯甜美'],
        price: 288.00,
        stock: 20
      },
      {
        id: '2-6',
        specs: ['L', '清纯甜美'],
        price: 288.00,
        stock: 15
      }
    ]
  },
  {
    id: 3,
    name: '浪漫玫瑰按摩棒',
    price: 399.00,
    description: '女性自慰器，静音防水，USB充电，多频震动，医用硅胶材质',
    images: [
      'https://example.com/product3-1.jpg',
      'https://example.com/product3-2.jpg',
    ],
    stock: 88
  },
]

const router = useRouter()
const showDetail = ref(false)
const selectedProduct = ref(products[0])
const cartStore = useCartStore()

const showProductDetail = (product: any) => {
  selectedProduct.value = product
  showDetail.value = true
}

const handleAddToCart = ({ product, sku, quantity }: any) => {
  cartStore.addToCart(product, sku, quantity)
  showDetail.value = false
  // 显示成功提示
  const toast = useToast()
  toast.success('已加入购物车')
}

const handleBuyNow = ({ product, quantity }: any) => {
  showDetail.value = false
  router.push('/cart')
}

const handleService = (product: any) => {
  showDetail.value = false
  router.push('/chat')
}
</script>

<style scoped>
.home-page {
  padding: 10px;
  position: relative;
  min-height: 100vh;
}

.top-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, var(--theme-purple) 0%, transparent 100%);
  opacity: 0.1;
  pointer-events: none;
}

.banner {
  height: 170px; /* 减少15%高度 */
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
}

.banner-wrapper {
  position: relative;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 50%);
}

.category-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
  padding: 4px 0;
}

.tag-item {
  padding: 6px 16px;
  background: rgba(255, 77, 140, 0.1);
  border-radius: 20px;
  color: var(--theme-pink);
  font-size: 14px;
  white-space: nowrap;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.product-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.product-card:active {
  transform: scale(0.98);
}

.product-image-wrapper {
  position: relative;
  padding-top: 100%;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-info {
  padding: 10px;
}

.product-name {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-price {
  font-size: 16px;
  color: var(--theme-pink);
  font-weight: bold;
}
</style> 