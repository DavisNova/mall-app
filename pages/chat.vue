<template>
  <div class="chat-page">
    <iframe 
      :src="chatUrl"
      class="chat-frame"
      frameborder="0"
      allow="microphone; camera"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const chatUrl = 'http://154.196.128.135:8081/chatIndex?kefu_id=kefu2'
</script>

<style scoped>
.chat-page {
  height: 100vh;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-frame {
  width: 100%;
  height: 100%;
  border: none;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .chat-page {
    padding: 0;
  }
}

/* PC端适配 */
@media screen and (min-width: 769px) {
  .chat-frame {
    max-width: 800px;
    margin: 0 auto;
    height: 90vh;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
}
</style> 