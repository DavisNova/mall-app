<template>
  <div class="chat-page">
    <!-- 顶部导航 -->
    <div class="chat-header">
      <van-icon name="arrow-left" @click="router.back()" />
      <span>在线客服</span>
      <van-icon name="ellipsis" @click="showActions = true" />
    </div>

    <!-- 聊天内容区域 -->
    <div class="chat-content" ref="chatContent">
      <div v-for="message in chatStore.messages" 
           :key="message.id"
           :class="['message-wrapper', message.sender === 'user' ? 'message-right' : 'message-left']">
        <!-- 客服头像 -->
        <template v-if="message.sender === 'admin'">
          <div class="avatar">
            <van-image
              round
              width="40"
              height="40"
              src="https://example.com/admin-avatar.jpg"
            />
          </div>
        </template>

        <!-- 消息内容 -->
        <div class="message-content" :class="message.type">
          <!-- 文本消息 -->
          <template v-if="message.type === 'text'">
            {{ message.content }}
          </template>

          <!-- 商品消息 -->
          <template v-else-if="message.type === 'product'">
            <div class="product-message" @click="showProductDetail(message.productInfo)">
              <van-image
                :src="message.productInfo.images[0]"
                width="60"
                height="60"
              />
              <div class="product-info">
                <div class="product-name">{{ message.productInfo.name }}</div>
                <div class="product-price">¥{{ message.productInfo.price }}</div>
              </div>
            </div>
          </template>

          <!-- 图片消息 -->
          <template v-else-if="message.type === 'image'">
            <van-image
              :src="message.content"
              width="120"
              height="120"
              fit="cover"
              @click="handlePreviewImage(message.content)"
            />
          </template>
        </div>

        <!-- 用户头像 -->
        <template v-if="message.sender === 'user'">
          <div class="avatar">
            <van-image
              round
              width="40"
              height="40"
              src="https://example.com/user-avatar.jpg"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- 底部输入区域 -->
    <div class="chat-footer">
      <div class="input-actions">
        <van-uploader
          :after-read="handleImageUpload"
          accept="image/*"
          :max-size="5 * 1024 * 1024"
          @oversize="handleOversize"
        >
          <van-icon name="photograph" size="24" />
        </van-uploader>
      </div>
      <van-field
        v-model="inputMessage"
        placeholder="请输入消息..."
        :border="false"
        @keypress.enter="sendMessage"
      >
        <template #button>
          <van-button 
            size="small" 
            type="primary"
            class="send-btn"
            @click="sendMessage"
          >
            发送
          </van-button>
        </template>
      </van-field>
    </div>

    <!-- 操作菜单 -->
    <van-action-sheet
      v-model:show="showActions"
      :actions="actions"
      @select="onActionSelect"
      cancel-text="取消"
    />

    <!-- 图片预览 -->
    <van-image-preview
      v-model:show="showPreview"
      :images="[previewImageUrl]"
    />
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '~/stores/chat'
import ProductDetail from '~/components/ProductDetail.vue'

const router = useRouter()
const chatStore = useChatStore()
const chatContent = ref<HTMLElement | null>(null)
const inputMessage = ref('')
const showActions = ref(false)
const showPreview = ref(false)
const previewImageUrl = ref('')

// 在组件挂载时加载聊天记录
onMounted(() => {
  chatStore.loadFromLocal()
  chatStore.connect()
  scrollToBottom()
})

// 监听消息变化,自动滚动到底部
watch(() => chatStore.messages.length, () => {
  nextTick(() => {
    scrollToBottom()
  })
})

// 滚动到底部
const scrollToBottom = () => {
  if (chatContent.value) {
    chatContent.value.scrollTop = chatContent.value.scrollHeight
  }
}

// 发送消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  chatStore.sendMessage(inputMessage.value)
  inputMessage.value = ''
}

// 预览图片
const handlePreviewImage = (url: string) => {
  previewImageUrl.value = url
  showPreview.value = true
}

// 显示商品详情
const showProductDetail = (product: any) => {
  // TODO: 实现商品详情展示
}

// 操作菜单
const actions = [
  { name: '清空聊天记录', color: '#ee0a24' }
]

const onActionSelect = (action: { name: string }) => {
  if (action.name === '清空聊天记录') {
    chatStore.clearMessages()
  }
  showActions.value = false
}

// 处理图片上传
const handleImageUpload = async (file: any) => {
  try {
    // 这里应该调用实际的上传API
    // 暂时使用本地URL模拟
    const imageUrl = URL.createObjectURL(file.file)
    chatStore.sendImage(imageUrl)
  } catch (error) {
    const toast = useToast()
    toast.fail('图片上传失败')
  }
}

// 处理图片大小超限
const handleOversize = () => {
  const toast = useToast()
  toast.fail('图片大小不能超过5MB')
}
</script>

<style scoped>
.chat-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.chat-header .van-icon {
  font-size: 24px;
  color: #fff;
}

.chat-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.message-left {
  justify-content: flex-start;
}

.message-right {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  margin: 0 8px;
}

.message-content {
  max-width: 70%;
  padding: 12px;
  border-radius: 12px;
  word-break: break-all;
  position: relative;
}

.message-left .message-content {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  margin-right: 48px;
}

.message-right .message-content {
  background: var(--theme-pink);
  color: #fff;
  margin-left: 48px;
}

.product-message {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 14px;
  color: #fff;
}

.product-price {
  font-size: 16px;
  color: var(--theme-pink);
  font-weight: bold;
}

.chat-footer {
  padding: 8px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  bottom: 0;
}

:deep(.van-field) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0 12px;
}

:deep(.van-field__control) {
  color: #fff;
}

.send-btn {
  margin-left: 8px;
  background: linear-gradient(to right, #ff4d8c, #ff8eb3);
  border: none;
  border-radius: 16px;
}

:deep(.van-action-sheet) {
  background: #1a1a1a;
}

:deep(.van-action-sheet__item) {
  color: #fff;
}

:deep(.van-action-sheet__cancel) {
  color: rgba(255, 255, 255, 0.6);
}

.input-actions {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.input-actions .van-icon {
  color: rgba(255, 255, 255, 0.8);
  margin-right: 8px;
  cursor: pointer;
}

:deep(.van-uploader) {
  display: flex;
  align-items: center;
}

:deep(.van-uploader__wrapper) {
  background: none;
}
</style> 