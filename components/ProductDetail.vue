<template>
  <van-popup
    :show="show"
    @update:show="$emit('update:show', $event)"
    round
    position="bottom"
    :style="{ height: '85%' }"
    class="product-popup"
    @click-overlay="$emit('update:show', false)"
  >
    <div class="product-detail">
      <!-- 关闭按钮 -->
      <div class="close-btn" @click="$emit('update:show', false)">
        <van-icon name="cross" size="24" color="#fff" />
      </div>

      <!-- 商品图片轮播 -->
      <van-swipe class="product-swipe" :autoplay="3000" indicator-color="var(--theme-pink)">
        <van-swipe-item v-for="(image, index) in product.images" :key="index" class="swipe-item">
          <div class="image-wrapper">
            <van-image 
              :src="image" 
              fit="contain" 
              class="product-image"
              @click="handleImageClick(image)"
            >
              <template #loading>
                <div class="loading-placeholder shimmer"></div>
              </template>
            </van-image>
          </div>
        </van-swipe-item>
      </van-swipe>

      <!-- 商品信息 -->
      <div class="product-info">
        <div class="product-header">
          <h2 class="product-name">{{ product.name }}</h2>
          <div class="product-price">
            <span class="currency">¥</span>
            <span class="amount">{{ currentSku ? currentSku.price : product.price }}</span>
          </div>
        </div>
        <div class="product-tags">
          <span class="tag" v-for="(tag, index) in ['包邮', '正品保证', '七天退换']" :key="index">
            {{ tag }}
          </span>
        </div>
        <div class="product-desc">{{ product.description }}</div>
      </div>

      <!-- 规格选择 -->
      <div class="specs-section" v-if="product.specs">
        <div v-for="(spec, specIndex) in product.specs" :key="specIndex" class="spec-group">
          <div class="spec-title">{{ spec.name }}</div>
          <div class="spec-values">
            <div
              v-for="value in spec.values"
              :key="value"
              class="spec-value"
              :class="{
                'selected': selectedSpecs[specIndex] === value,
                'disabled': !isSpecValueAvailable(specIndex, value)
              }"
              @click="selectSpec(specIndex, value)"
            >
              {{ value }}
            </div>
          </div>
        </div>
      </div>

      <!-- 数量选择 -->
      <div class="quantity-section">
        <span class="section-title">购买数量</span>
        <van-stepper 
          v-model="localQuantity" 
          :min="1" 
          :max="currentSku ? currentSku.stock : product.stock" 
          @change="handleQuantityChange"
        />
      </div>

      <!-- 底部按钮组 -->
      <div class="action-buttons">
        <div class="service-btn" @click="handleService">
          <van-icon name="service-o" size="20" />
          <span>客服</span>
        </div>
        <van-button 
          class="cart-btn"
          :color="'linear-gradient(to right, #ff6034, #ee0a24)'"
          @click="handleAddToCart"
          :disabled="!isSkuSelected"
        >
          {{ isSkuSelected ? '加入购物车' : '请选择规格' }}
        </van-button>
        <van-button 
          class="buy-btn"
          :color="'linear-gradient(to right, #ff4d8c, #ff8eb3)'"
          @click="handleBuyNow"
          :disabled="!isSkuSelected"
        >
          {{ isSkuSelected ? '立即购买' : '请选择规格' }}
        </van-button>
      </div>
    </div>

    <!-- 图片预览 -->
    <van-image-preview
      v-model:show="showImagePreview"
      :images="product.images"
      :start-position="currentImageIndex"
      @change="handlePreviewChange"
    />
  </van-popup>
</template>

<script setup lang="ts">
interface Spec {
  name: string
  values: string[]
}

interface Sku {
  id: string
  specs: string[]
  price: number
  stock: number
}

interface Product {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  stock: number
  specs?: Spec[]
  skus?: Sku[]
}

const props = defineProps<{
  show: boolean
  product: Product
}>()

const emit = defineEmits(['update:show', 'addToCart', 'buyNow', 'service'])

const localQuantity = ref(1)
const showImagePreview = ref(false)
const currentImageIndex = ref(0)
const selectedSpecs = ref<string[]>([])

// 初始化选中规格
watch(() => props.show, (newVal) => {
  if (newVal) {
    localQuantity.value = 1
    selectedSpecs.value = props.product.specs ? props.product.specs.map(() => '') : []
  }
})

// 获取当前选中的SKU
const currentSku = computed(() => {
  if (!props.product.skus || !isSkuSelected.value) return null
  return props.product.skus.find(sku => 
    sku.specs.every((spec, index) => spec === selectedSpecs.value[index])
  )
})

// 判断是否已选择完所有规格
const isSkuSelected = computed(() => {
  if (!props.product.specs) return true
  return selectedSpecs.value.every(spec => spec !== '')
})

// 判断规格值是否可选
const isSpecValueAvailable = (specIndex: number, value: string) => {
  if (!props.product.skus) return true
  
  const tempSpecs = [...selectedSpecs.value]
  tempSpecs[specIndex] = value
  
  return props.product.skus.some(sku => {
    return sku.specs.every((spec, index) => {
      return tempSpecs[index] === '' || spec === tempSpecs[index]
    }) && sku.stock > 0
  })
}

// 选择规格
const selectSpec = (specIndex: number, value: string) => {
  if (!isSpecValueAvailable(specIndex, value)) return
  selectedSpecs.value[specIndex] = selectedSpecs.value[specIndex] === value ? '' : value
}

const handleQuantityChange = (value: number) => {
  localQuantity.value = value
}

const handleImageClick = (image: string) => {
  currentImageIndex.value = props.product.images.indexOf(image)
  showImagePreview.value = true
}

const handlePreviewChange = (index: number) => {
  currentImageIndex.value = index
}

const handleAddToCart = () => {
  if (!isSkuSelected.value) return
  emit('addToCart', {
    product: props.product,
    sku: currentSku.value,
    quantity: localQuantity.value
  })
}

const handleBuyNow = () => {
  if (!isSkuSelected.value) return
  emit('buyNow', {
    product: props.product,
    sku: currentSku.value,
    quantity: localQuantity.value
  })
}

const handleService = () => {
  emit('service', props.product)
}
</script>

<style scoped>
.product-popup {
  background: linear-gradient(to bottom, #1a1a1a, #2d1f3d);
  color: #fff;
}

.product-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:active {
  transform: scale(0.9);
}

.product-swipe {
  height: 40vh;
  background: #000;
}

.swipe-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.loading-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
}

.product-info {
  padding: 16px;
}

.product-header {
  margin-bottom: 12px;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  background: linear-gradient(to right, #fff, #ff8eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-price {
  display: flex;
  align-items: baseline;
  color: var(--theme-pink);
}

.currency {
  font-size: 16px;
  margin-right: 2px;
}

.amount {
  font-size: 24px;
  font-weight: bold;
}

.product-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  padding: 2px 8px;
  background: rgba(255, 77, 140, 0.1);
  border-radius: 4px;
  font-size: 12px;
  color: var(--theme-pink);
}

.product-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.specs-section {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.3s ease;
}

.spec-group {
  margin-bottom: 16px;
}

.spec-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}

.spec-values {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.spec-value {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.spec-value::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
}

.spec-value:active::after {
  transform: translate(-50%, -50%) scale(2);
}

.spec-value.selected {
  background: var(--theme-pink);
  color: #fff;
}

.spec-value.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.4);
}

.quantity-section {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.3s ease;
}

.section-title {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
}

.action-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  animation: slideUp 0.3s ease;
}

.service-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  color: #fff;
  font-size: 12px;
  gap: 4px;
  position: relative;
  overflow: hidden;
}

.service-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
}

.service-btn:active::after {
  transform: translate(-50%, -50%) scale(2);
}

.cart-btn,
.buy-btn {
  flex: 1;
  height: 40px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.cart-btn::after,
.buy-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.cart-btn:active::after,
.buy-btn:active::after {
  left: 100%;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
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
</style> 