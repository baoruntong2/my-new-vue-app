import { defineStore } from 'pinia'
import loanService from '@/services/loanService'

export const useLoanStore = defineStore('loan', {
  state: () => ({
    // 用户贷款列表
    myLoans: [],
    // 预授信额度
    preApprovedAmount: 0,
    preApprovedRate: 0,
    // 当前申请的贷款
    currentApplication: null,
    // 公积金信息
    housingFundInfo: {
      balance: 0,
      monthlyDeposit: 0,
      loanLimit: 0,
      accountNumber: '',
      status: 'active'
    },
    // 客户经理列表
    managers: [],
    // 加载状态
    isLoading: false,
    error: null
  }),

  actions: {
    // 获取预授信额度
    async fetchPreApprovedAmount() {
      try {
        this.isLoading = true
        const data = await loanService.getPreApprovedAmount()
        this.preApprovedAmount = data.amount || 0
        this.preApprovedRate = data.rate || 0
        return data
      } catch (error) {
        this.error = error.message || '获取预授信额度失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 获取我的贷款列表
    async fetchMyLoans() {
      try {
        this.isLoading = true
        const data = await loanService.getMyLoans()
        this.myLoans = data || []
        return this.myLoans
      } catch (error) {
        this.error = error.message || '获取贷款列表失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 申请消费贷款
    async applyConsumerLoan(loanData) {
      try {
        this.isLoading = true
        const data = await loanService.applyConsumerLoan(loanData)
        this.currentApplication = data
        return data
      } catch (error) {
        this.error = error.message || '申请失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 申请大额贷款（预审）
    async applyLargeLoan(loanData) {
      try {
        this.isLoading = true
        const data = await loanService.applyLargeLoan(loanData)
        this.currentApplication = data
        return data
      } catch (error) {
        this.error = error.message || '预审申请失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 上传贷款材料
    async uploadLoanDocuments(loanId, documents) {
      try {
        this.isLoading = true
        const data = await loanService.uploadDocuments(loanId, documents)
        return data
      } catch (error) {
        this.error = error.message || '材料上传失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 获取客户经理列表
    async fetchManagers(params) {
      try {
        this.isLoading = true
        const data = await loanService.getManagers(params)
        this.managers = data || []
        return this.managers
      } catch (error) {
        this.error = error.message || '获取客户经理列表失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 预约面签
    async bookAppointment(appointmentData) {
      try {
        this.isLoading = true
        const data = await loanService.bookAppointment(appointmentData)
        return data
      } catch (error) {
        this.error = error.message || '预约失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 获取公积金信息
    async fetchHousingFundInfo() {
      try {
        this.isLoading = true
        const data = await loanService.getHousingFundInfo()
        this.housingFundInfo = {
          balance: data.balance || 0,
          monthlyDeposit: data.monthlyDeposit || 0,
          loanLimit: data.loanLimit || 0,
          accountNumber: data.accountNumber || '',
          status: data.status || 'active'
        }
        return this.housingFundInfo
      } catch (error) {
        this.error = error.message || '获取公积金信息失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 申请公积金提取
    async applyHousingFundWithdrawal(withdrawalData) {
      try {
        this.isLoading = true
        const data = await loanService.applyHousingFundWithdrawal(withdrawalData)
        return data
      } catch (error) {
        this.error = error.message || '提取申请失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 还款
    async repayLoan(loanId, repayData) {
      try {
        this.isLoading = true
        const data = await loanService.repayLoan(loanId, repayData)
        // 更新贷款列表
        await this.fetchMyLoans()
        return data
      } catch (error) {
        this.error = error.message || '还款失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 预约还款
    async scheduleRepayment(loanId, scheduleData) {
      try {
        this.isLoading = true
        const data = await loanService.scheduleRepayment(loanId, scheduleData)
        return data
      } catch (error) {
        this.error = error.message || '预约还款失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 获取还款记录
    async fetchRepaymentHistory(loanId) {
      try {
        this.isLoading = true
        const data = await loanService.getRepaymentHistory(loanId)
        return data
      } catch (error) {
        this.error = error.message || '获取还款记录失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 获取贷款进度
    async fetchLoanProgress(loanId) {
      try {
        this.isLoading = true
        const data = await loanService.getLoanProgress(loanId)
        return data
      } catch (error) {
        this.error = error.message || '获取贷款进度失败'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // 清除错误
    clearError() {
      this.error = null
    }
  },

  getters: {
    // 未结清贷款
    activeLoans: (state) => {
      return state.myLoans.filter(loan => loan.status !== 'closed' && loan.status !== 'settled')
    },

    // 总待还金额
    totalPendingAmount: (state) => {
      return state.myLoans
        .filter(loan => loan.status !== 'closed' && loan.status !== 'settled')
        .reduce((sum, loan) => sum + (loan.pendingAmount || 0), 0)
    },

    // 下一个还款日
    nextRepaymentDate: (state) => {
      const activeLoans = state.myLoans.filter(loan => loan.status !== 'closed' && loan.status !== 'settled')
      if (activeLoans.length === 0) return null
      const dates = activeLoans.map(loan => loan.nextRepaymentDate).filter(Boolean)
      if (dates.length === 0) return null
      return new Date(Math.min(...dates.map(d => new Date(d))))
    }
  }
})

