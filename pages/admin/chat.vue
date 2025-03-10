<template>
  <div class="admin-chat-page">
    <!-- 顶部导航 -->
    <div class="admin-header">
      <h1>客服管理</h1>
      <van-button 
        size="small" 
        type="primary"
        @click="handleLogout"
      >
        退出登录
      </van-button>
    </div>

    <!-- 聊天列表 -->
    <div class="chat-list">
      <div v-for="message in chatStore.messages" 
           :key="message.id"
           :class="['message-wrapper', message.sender === 'admin' ? 'message-right' : 'message-left']">
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

        <!-- 消息内容 -->
        <div class="message-content" :class="message.type">
          <!-- 文本消息 -->
          <template v-if="message.type === 'text'">
            {{ message.content }}
          </template>

          <!-- 商品消息 -->
          <template v-else-if="message.type === 'product'">
            <div class="product-message">
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
      </div>
    </div>

    <!-- 底部回复区域 -->
    <div class="reply-footer">
      <div class="reply-actions">
        <van-icon 
          name="description" 
          size="24" 
          @click="showQuickReplies = true"
        />
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
        v-model="replyMessage"
        placeholder="请输入回复内容..."
        :border="false"
        @keypress.enter="sendReply"
      >
        <template #button>
          <van-button 
            size="small" 
            type="primary"
            class="send-btn"
            @click="sendReply"
          >
            回复
          </van-button>
        </template>
      </van-field>
    </div>

    <!-- 快捷回复菜单 -->
    <van-action-sheet
      v-model:show="showQuickReplies"
      title="快捷回复"
      :actions="quickReplies"
      @select="onQuickReplySelect"
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

const router = useRouter()
const chatStore = useChatStore()
const replyMessage = ref('')
const showQuickReplies = ref(false)
const showPreview = ref(false)
const previewImageUrl = ref('')

// 快捷回复列表
const quickReplies = [
  { name: '您好,请问有什么可以帮您?' },
  { name: '好的,我明白了,让我为您查询一下' },
  { name: '抱歉让您久等了' },
  { name: '还有其他问题需要帮助吗?' },
  { name: '祝您购物愉快!' },
  { name: '商品目前有现货,可以直接下单' },
  { name: '您可以添加到购物车,稍后一起结算' },
  { name: '这款商品正在促销,现在购买很划算' },
  { name: '商品的质量和安全性都经过严格检测' },
  { name: '如果收到商品不满意,可以申请退换' },
  { name: '建议您选择尺码时参考详情页的尺码表' },
  { name: '我们会为您的隐私信息严格保密' },
  { name: '商品会在24小时内发出' },
  { name: '快递一般3-5天送达' },
  { name: '您的满意是我们最大的追求' }
]

// 在组件挂载时加载聊天记录
onMounted(() => {
  // 检查登录状态
  const isLoggedIn = localStorage.getItem('adminLoggedIn')
  if (!isLoggedIn) {
    router.push('/admin/login')
    return
  }
  
  chatStore.loadFromLocal()
  chatStore.connect()
})

// 发送回复
const sendReply = () => {
  if (!replyMessage.value.trim()) return
  chatStore.receiveMessage(replyMessage.value)
  replyMessage.value = ''
}

// 选择快捷回复
const onQuickReplySelect = (action: { name: string }) => {
  chatStore.receiveMessage(action.name)
  showQuickReplies.value = false
}

// 预览图片
const handlePreviewImage = (url: string) => {
  previewImageUrl.value = url
  showPreview.value = true
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('adminLoggedIn')
  router.push('/admin/login')
}

// 处理图片上传
const handleImageUpload = async (file: any) => {
  try {
    // 这里应该调用实际的上传API
    // 暂时使用本地URL模拟
    const imageUrl = URL.createObjectURL(file.file)
    chatStore.receiveMessage(imageUrl)
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
.admin-chat-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-header h1 {
  font-size: 24px;
  color: #fff;
  margin: 0;
  background: linear-gradient(to right, #fff, #ff8eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chat-list {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  max-width: 800px;
}

.message-left {
  margin-right: auto;
}

.message-right {
  margin-left: auto;
  flex-direction: row-reverse;
}

.avatar {
  margin: 0 12px;
}

.message-content {
  max-width: 600px;
  padding: 16px;
  border-radius: 16px;
  word-break: break-all;
  position: relative;
  font-size: 16px;
  line-height: 1.5;
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
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s;
}

.product-message:hover {
  background: rgba(255, 255, 255, 0.1);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-name {
  font-size: 16px;
  color: #fff;
}

.product-price {
  font-size: 18px;
  color: var(--theme-pink);
  font-weight: bold;
}

.reply-footer {
  padding: 16px 24px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.reply-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
}

.reply-actions .van-icon {
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s;
}

.reply-actions .van-icon:hover {
  color: var(--theme-pink);
}

:deep(.van-field) {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 0 16px;
  margin: 0 16px;
  flex: 1;
}

:deep(.van-field__control) {
  color: #fff;
  font-size: 16px;
  height: 48px;
  line-height: 48px;
}

.send-btn {
  margin-left: 16px;
  background: linear-gradient(to right, #ff4d8c, #ff8eb3);
  border: none;
  border-radius: 24px;
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
}

:deep(.van-action-sheet) {
  background: #1a1a1a;
  max-width: 600px;
  margin: 0 auto;
}

:deep(.van-action-sheet__item) {
  color: #fff;
  font-size: 16px;
  padding: 16px;
  transition: all 0.3s;
}

:deep(.van-action-sheet__item:active) {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.van-action-sheet__header) {
  color: var(--theme-pink);
  font-size: 18px;
  font-weight: bold;
}

/* PC端适配 */
@media screen and (min-width: 1024px) {
  .admin-header {
    padding: 20px 40px;
  }

  .admin-header h1 {
    font-size: 28px;
  }

  .chat-list {
    padding: 40px;
  }

  .message-content {
    font-size: 16px;
  }

  .reply-footer {
    padding: 20px 40px;
  }

  :deep(.van-field__control) {
    font-size: 16px;
  }
}
</style> 