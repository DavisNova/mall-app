<template>
  <div class="cart-page">
    <div class="cart-header">
      <h1>购物车</h1>
      <van-button 
        v-if="cartStore.items.length > 0"
        size="small" 
        plain 
        @click="cartStore.clearCart()"
      >
        清空
      </van-button>
    </div>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <van-empty description="购物车是空的" />
      <van-button 
        type="primary" 
        class="shop-btn"
        @click="router.push('/')"
      >
        去逛逛
      </van-button>
    </div>

    <div v-else class="cart-list">
      <div 
        v-for="item in cartStore.items" 
        :key="item.productId + item.skuId"
        class="cart-item"
      >
        <van-swipe-cell>
          <div class="item-content">
            <van-image
              :src="item.product.images[0]"
              class="item-image"
              width="80"
              height="80"
            />
            <div class="item-info">
              <div class="item-name">{{ item.product.name }}</div>
              <div class="item-specs" v-if="item.sku">
                <span v-for="(spec, index) in item.sku.specs" :key="index">
                  {{ spec }}
                  <span v-if="index < item.sku.specs.length - 1">，</span>
                </span>
              </div>
              <div class="item-price">
                ¥{{ item.sku ? item.sku.price : item.product.price }}
              </div>
              <van-stepper
                v-model="item.quantity"
                @change="updateQuantity(item)"
                :min="1"
                :max="item.sku ? item.sku.stock : item.product.stock"
              />
            </div>
          </div>
          <template #right>
            <van-button 
              square 
              text="删除" 
              type="danger" 
              class="delete-button"
              @click="removeItem(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>

    <div class="cart-footer" v-if="cartStore.items.length > 0">
      <div class="total-info">
        <span>合计：</span>
        <span class="total-price">¥{{ cartStore.totalPrice.toFixed(2) }}</span>
      </div>
      <van-button 
        type="primary" 
        class="checkout-btn"
        @click="handleCheckout"
      >
        结算({{ cartStore.totalCount }})
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const updateQuantity = (item: any) => {
  cartStore.updateQuantity(item.productId, item.skuId, item.quantity)
}

const removeItem = (item: any) => {
  cartStore.removeFromCart(item.productId, item.skuId)
}

const handleCheckout = () => {
  // TODO: 实现结算功能
  const toast = useToast()
  toast.success('结算功能开发中...')
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  padding: 16px;
  padding-bottom: 100px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart-header h1 {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(to right, #fff, #ff8eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.shop-btn {
  margin-top: 20px;
  width: 120px;
  background: linear-gradient(to right, #ff4d8c, #ff8eb3);
  border: none;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.item-content {
  display: flex;
  padding: 12px;
  gap: 12px;
}

.item-image {
  border-radius: 8px;
  overflow: hidden;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-name {
  font-size: 16px;
  color: #fff;
}

.item-specs {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.item-price {
  font-size: 18px;
  font-weight: bold;
  color: var(--theme-pink);
}

.delete-button {
  height: 100%;
}

.cart-footer {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-info {
  color: #fff;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  color: var(--theme-pink);
}

.checkout-btn {
  background: linear-gradient(to right, #ff4d8c, #ff8eb3);
  border: none;
  border-radius: 20px;
  padding: 0 24px;
}

:deep(.van-stepper) {
  --van-stepper-background: transparent;
  --van-stepper-button-text-color: #fff;
  --van-stepper-input-text-color: #fff;
  --van-stepper-button-disabled-text-color: rgba(255, 255, 255, 0.4);
  --van-stepper-input-disabled-text-color: rgba(255, 255, 255, 0.4);
}

:deep(.van-stepper-input) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.van-stepper-minus),
:deep(.van-stepper-plus) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.van-empty) {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
}

:deep(.van-empty__image) {
  opacity: 0.6;
}
</style> 