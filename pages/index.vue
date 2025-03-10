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

    <!-- 添加客服按钮 -->
    <div class="chat-icon" @click="router.push('/chat')">
      <van-icon name="service-o" size="30" color="#fff" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductDetail from '~/components/ProductDetail.vue'
import { useCartStore } from '~/stores/cart'

const router = useRouter()
const showDetail = ref(false)
const selectedProduct = ref(null)
const cartStore = useCartStore()

// 页面数据
const banners = ref([])
const products = ref([])
const loading = ref(true)
const page = ref(1)
const hasMore = ref(true)

// 获取轮播图数据
const fetchBanners = async () => {
  try {
    const res = await fetch('/api/v1/banners')
    const data = await res.json()
    if (data.code === 0) {
      banners.value = data.data
    }
  } catch (error) {
    console.error('获取轮播图失败:', error)
  }
}

// 获取商品列表
const fetchProducts = async (isLoadMore = false) => {
  if (!isLoadMore) {
    page.value = 1
    products.value = []
  }
  
  try {
    loading.value = true
    const res = await fetch(`/api/v1/products?page=${page.value}&limit=10`)
    const data = await res.json()
    if (data.code === 0) {
      if (isLoadMore) {
        products.value.push(...data.data.items)
      } else {
        products.value = data.data.items
      }
      hasMore.value = data.data.items.length === 10
    }
  } catch (error) {
    console.error('获取商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载更多
const loadMore = () => {
  if (loading.value || !hasMore.value) return
  page.value++
  fetchProducts(true)
}

// 显示商品详情
const showProductDetail = (product: any) => {
  selectedProduct.value = product
  showDetail.value = true
}

// 添加到购物车
const handleAddToCart = async ({ product, sku, quantity }: any) => {
  try {
    const res = await fetch('/api/v1/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_id: product.id,
        sku_id: sku.id,
        quantity
      })
    })
    const data = await res.json()
    if (data.code === 0) {
      showDetail.value = false
      const toast = useToast()
      toast.success('已加入购物车')
      // 更新购物车数量
      cartStore.updateCount(data.data.cart_count)
    }
  } catch (error) {
    console.error('添加购物车失败:', error)
    const toast = useToast()
    toast.fail('添加失败，请重试')
  }
}

// 立即购买
const handleBuyNow = ({ product, sku, quantity }: any) => {
  showDetail.value = false
  router.push({
    path: '/order/confirm',
    query: {
      product_id: product.id,
      sku_id: sku.id,
      quantity
    }
  })
}

// 联系客服
const handleService = (product: any) => {
  showDetail.value = false
  router.push('/chat')
}

// 监听滚动加载更多
const { y } = useScroll(window)
watch(y, (newY) => {
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  if (newY + clientHeight >= scrollHeight - 50) {
    loadMore()
  }
})

// 初始化数据
onMounted(() => {
  fetchBanners()
  fetchProducts()
})
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

.chat-icon {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff4d8c 0%, #ff8eb3 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 999;
}

.chat-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.chat-icon:active {
  transform: scale(0.95);
}
</style> 