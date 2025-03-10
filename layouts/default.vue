<template>
  <div class="app-container">
    <!-- 背景动画 -->
    <div class="background-animation"></div>
    
    <!-- 页面内容 -->
    <div class="page-content">
      <slot />
    </div>
    
    <!-- 底部导航栏 -->
    <div class="fixed-bottom">
      <div class="bottom-nav">
        <div class="nav-item" @click="navigateTo('/')">
          <van-icon name="home-o" size="24" :color="activeTab === 0 ? '#ff4d8c' : '#fff'" />
          <span>首页</span>
        </div>
        <div class="nav-item" @click="navigateTo('/cart')">
          <div class="cart-icon">
            <van-icon name="cart-o" size="24" :color="activeTab === 1 ? '#ff4d8c' : '#fff'" />
            <span v-if="cartCount" class="cart-badge">{{ cartCount }}</span>
          </div>
          <span>购物车</span>
        </div>
        <div class="nav-item" @click="navigateTo('/chat')">
          <van-icon name="service-o" size="24" :color="activeTab === 2 ? '#ff4d8c' : '#fff'" />
          <span>客服</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const activeTab = ref(0)
const cartStore = useCartStore()

// 在组件挂载时加载购物车数据
onMounted(() => {
  cartStore.loadFromLocal()
})

// 使用计算属性获取购物车数量
const cartCount = computed(() => cartStore.totalCount)

const router = useRouter()
const route = useRoute()

// 监听路由变化更新activeTab
watch(() => route.path, (path) => {
  switch (path) {
    case '/':
      activeTab.value = 0
      break
    case '/cart':
      activeTab.value = 1
      break
    case '/chat':
      activeTab.value = 2
      break
  }
}, { immediate: true })

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
  position: relative;
  overflow: hidden;
}

.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 77, 140, 0.1) 0%, transparent 50%);
  z-index: -1;
  animation: backgroundMove 20s ease-in-out infinite alternate;
}

@keyframes backgroundMove {
  0% {
    transform: scale(1) rotate(0deg);
  }
  100% {
    transform: scale(1.1) rotate(5deg);
  }
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  padding: 5px 0;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  gap: 4px;
  position: relative;
  padding: 4px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item:active {
  transform: scale(0.95);
}

.cart-icon {
  position: relative;
  display: inline-block;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--theme-pink);
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
}

.nav-item span {
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.nav-item:active span {
  color: var(--theme-pink);
}
</style> 