import { defineStore } from 'pinia'

interface CartItem {
  productId: number
  skuId: string
  quantity: number
  product: any
  sku: any
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    totalCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => {
        const price = item.sku ? item.sku.price : item.product.price
        return total + price * item.quantity
      }, 0)
    }
  },

  actions: {
    addToCart(product: any, sku: any | null, quantity: number) {
      const existingItem = this.items.find(item => 
        item.productId === product.id && 
        (!sku || item.skuId === sku.id)
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          productId: product.id,
          skuId: sku ? sku.id : '',
          quantity,
          product,
          sku
        })
      }

      // 保存到本地存储
      this.saveToLocal()
    },

    removeFromCart(productId: number, skuId: string = '') {
      const index = this.items.findIndex(item => 
        item.productId === productId && item.skuId === skuId
      )
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocal()
      }
    },

    updateQuantity(productId: number, skuId: string = '', quantity: number) {
      const item = this.items.find(item => 
        item.productId === productId && item.skuId === skuId
      )
      if (item) {
        item.quantity = quantity
        this.saveToLocal()
      }
    },

    clearCart() {
      this.items = []
      this.saveToLocal()
    },

    // 从本地存储加载购物车数据
    loadFromLocal() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    },

    // 保存购物车数据到本地存储
    saveToLocal() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  }
}) 