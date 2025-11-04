import { defineStore } from 'pinia'

export default defineStore('cash', {
  state: () => ({
    transactions: [],
    currentCurrency: 'CNY',
    exchangeRates: {},
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchExchangeRates() {
      this.isLoading = true
      try {
        // 实际项目中替换为真实API调用
        this.exchangeRates = {
          USD: 0.14,
          EUR: 0.13,
          GBP: 0.11,
          JPY: 20.15
        }
      } catch (err) {
        this.error = '获取汇率失败，请稍后重试'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    addTransaction(transaction) {
      this.transactions.push({
        id: Date.now(),
        ...transaction,
        timestamp: new Date().toISOString()
      })
    },
    clearError() {
      this.error = null
    }
  },
  getters: {
    totalTransactions: (state) => state.transactions.length,
    recentTransactions: (state) => {
      return [...state.transactions].reverse().slice(0, 5)
    }
  }
})