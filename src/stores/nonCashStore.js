import { defineStore } from 'pinia'

export default defineStore('nonCash', {
  state: () => ({
    accounts: [],
    loans: [],
    paymentHistory: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchAccounts() {
      this.isLoading = true
      try {
        // 实际项目中替换为真实API调用
        this.accounts = [
          { id: 1, type: 'savings', balance: 50000, accountNumber: '6222 **** **** 1234' },
          { id: 2, type: 'checking', balance: 15000, accountNumber: '6222 **** **** 5678' }
        ]
      } catch (err) {
        this.error = '获取账户信息失败，请稍后重试'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },
    applyLoan(loanData) {
      this.loans.push({
        id: Date.now(),
        ...loanData,
        status: 'pending',
        appliedAt: new Date().toISOString()
      })
    },
    clearError() {
      this.error = null
    }
  },
  getters: {
    totalBalance: (state) => {
      return state.accounts.reduce((sum, account) => sum + account.balance, 0)
    },
    activeLoans: (state) => {
      return state.loans.filter(loan => loan.status !== 'rejected')
    }
  }
})