import { defineStore } from 'pinia'

interface Message {
  id: string
  content: string
  type: 'text' | 'image' | 'product'
  sender: 'user' | 'admin'
  timestamp: number
  productInfo?: any
}

interface ChatState {
  messages: Message[]
  currentProduct?: any
  ws: WebSocket | null
  connected: boolean
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: [],
    currentProduct: null,
    ws: null,
    connected: false
  }),

  actions: {
    // 连接WebSocket
    connect() {
      if (this.ws?.readyState === WebSocket.OPEN) return

      this.ws = new WebSocket('ws://localhost:3000/ws')
      
      this.ws.onopen = () => {
        this.connected = true
        console.log('WebSocket connected')
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'message') {
          this.messages.push(data.message)
          this.saveToLocal()
        }
      }

      this.ws.onclose = () => {
        this.connected = false
        console.log('WebSocket disconnected')
        // 尝试重新连接
        setTimeout(() => this.connect(), 3000)
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.ws?.close()
      }
    },

    // 发送消息
    sendMessage(content: string, type: 'text' | 'image' | 'product' = 'text', productInfo?: any) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        type,
        sender: 'user',
        timestamp: Date.now(),
        productInfo
      }

      // 通过WebSocket发送消息
      if (this.connected) {
        this.ws?.send(JSON.stringify({
          type: 'message',
          message
        }))
      } else {
        // 如果未连接,只保存到本地
        this.messages.push(message)
        this.saveToLocal()

        // 模拟客服自动回复
        if (type === 'product') {
          setTimeout(() => {
            this.receiveMessage('您好,我是在线客服,很高兴为您服务。请问您对这个商品有什么问题吗?')
          }, 1000)
        }
      }
    },

    // 接收消息
    receiveMessage(content: string) {
      const message: Message = {
        id: Date.now().toString(),
        content,
        type: 'text',
        sender: 'admin',
        timestamp: Date.now()
      }

      // 通过WebSocket发送消息
      if (this.connected) {
        this.ws?.send(JSON.stringify({
          type: 'message',
          message
        }))
      } else {
        // 如果未连接,只保存到本地
        this.messages.push(message)
        this.saveToLocal()
      }
    },

    // 发送图片消息
    sendImage(imageUrl: string) {
      this.sendMessage(imageUrl, 'image')
    },

    // 设置当前咨询的商品
    setCurrentProduct(product: any) {
      this.currentProduct = product
      if (product) {
        this.sendMessage(
          `${product.name}`,
          'product',
          product
        )
      }
    },

    // 清空聊天记录
    clearMessages() {
      this.messages = []
      this.saveToLocal()
    },

    // 从本地存储加载聊天记录
    loadFromLocal() {
      const savedChat = localStorage.getItem('chat')
      if (savedChat) {
        const { messages, currentProduct } = JSON.parse(savedChat)
        this.messages = messages
        this.currentProduct = currentProduct
      }
    },

    // 保存聊天记录到本地存储
    saveToLocal() {
      localStorage.setItem('chat', JSON.stringify({
        messages: this.messages,
        currentProduct: this.currentProduct
      }))
    }
  }
}) 