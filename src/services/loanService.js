import api from '@/services/api'

/**
 * 贷款服务模块 - 处理贷款相关API调用
 */
const loanService = {
  /**
   * 获取预授信额度
   * @returns {Promise<Object>} 预授信信息
   */
  getPreApprovedAmount: async () => {
    try {
      const response = await api.get('/loans/pre-approved')
      return response?.data || response
    } catch (error) {
      console.error('获取预授信额度失败:', error)
      // 模拟数据
      return {
        amount: 50000,
        rate: 4.35,
        message: '基于您的账户信息，我们为您评估了预授信额度'
      }
    }
  },

  /**
   * 获取我的贷款列表
   * @returns {Promise<Array>} 贷款列表
   */
  getMyLoans: async () => {
    try {
      const response = await api.get('/loans/my-loans')
      return response?.data || response
    } catch (error) {
      console.error('获取贷款列表失败:', error)
      // 模拟数据
      return []
    }
  },

  /**
   * 申请消费贷款
   * @param {Object} loanData - 贷款申请数据
   * @returns {Promise<Object>} 申请结果
   */
  applyConsumerLoan: async (loanData) => {
    try {
      const response = await api.post('/loans/consumer/apply', loanData)
      return response?.data || response
    } catch (error) {
      console.error('申请消费贷款失败:', error)
      throw new Error('申请失败，请稍后重试')
    }
  },

  /**
   * 申请大额贷款（预审）
   * @param {Object} loanData - 贷款申请数据
   * @returns {Promise<Object>} 预审结果
   */
  applyLargeLoan: async (loanData) => {
    try {
      const response = await api.post('/loans/large/pre-apply', loanData)
      return response?.data || response
    } catch (error) {
      console.error('大额贷款预审失败:', error)
      throw new Error('预审申请失败，请稍后重试')
    }
  },

  /**
   * 上传贷款材料
   * @param {string} loanId - 贷款ID
   * @param {Array} documents - 材料列表
   * @returns {Promise<Object>} 上传结果
   */
  uploadDocuments: async (loanId, documents) => {
    try {
      const formData = new FormData()
      documents.forEach((doc, index) => {
        formData.append(`document_${index}`, doc.file)
        formData.append(`type_${index}`, doc.type)
      })
      const response = await api.post(`/loans/${loanId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response?.data || response
    } catch (error) {
      console.error('上传材料失败:', error)
      throw new Error('材料上传失败，请稍后重试')
    }
  },

  /**
   * 获取客户经理列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>} 客户经理列表
   */
  getManagers: async (params) => {
    try {
      const response = await api.get('/loans/managers', { params })
      return response?.data || response
    } catch (error) {
      console.error('获取客户经理列表失败:', error)
      // 模拟数据
      return [
        {
          id: '1',
          name: '李经理',
          phone: '13800138001',
          branch: '总行营业部',
          address: '北京市朝阳区XX路XX号',
          distance: 1.2,
          specialty: ['房贷', '车贷'],
          rating: 4.8
        },
        {
          id: '2',
          name: '王经理',
          phone: '13800138002',
          branch: '海淀支行',
          address: '北京市海淀区XX路XX号',
          distance: 2.5,
          specialty: ['房贷'],
          rating: 4.9
        },
        {
          id: '3',
          name: '张经理',
          phone: '13800138003',
          branch: '西城支行',
          address: '北京市西城区XX路XX号',
          distance: 3.8,
          specialty: ['车贷'],
          rating: 4.7
        }
      ]
    }
  },

  /**
   * 预约面签
   * @param {Object} appointmentData - 预约数据
   * @returns {Promise<Object>} 预约结果
   */
  bookAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/loans/appointments', appointmentData)
      return response?.data || response
    } catch (error) {
      console.error('预约面签失败:', error)
      throw new Error('预约失败，请稍后重试')
    }
  },

  /**
   * 获取公积金信息
   * @returns {Promise<Object>} 公积金信息
   */
  getHousingFundInfo: async () => {
    try {
      const response = await api.get('/housing-fund/info')
      return response?.data || response
    } catch (error) {
      console.error('获取公积金信息失败:', error)
      // 模拟数据（内测账户"张三"）
      return {
        balance: 125680.50,
        monthlyDeposit: 2400,
        loanLimit: 800000,
        accountNumber: '1101234567890123456',
        status: 'active',
        lastUpdateDate: new Date().toISOString()
      }
    }
  },

  /**
   * 申请公积金提取
   * @param {Object} withdrawalData - 提取数据
   * @returns {Promise<Object>} 提取结果
   */
  applyHousingFundWithdrawal: async (withdrawalData) => {
    try {
      const response = await api.post('/housing-fund/withdraw', withdrawalData)
      return response?.data || response
    } catch (error) {
      console.error('公积金提取申请失败:', error)
      throw new Error('提取申请失败，请稍后重试')
    }
  },

  /**
   * 还款
   * @param {string} loanId - 贷款ID
   * @param {Object} repayData - 还款数据
   * @returns {Promise<Object>} 还款结果
   */
  repayLoan: async (loanId, repayData) => {
    try {
      const response = await api.post(`/loans/${loanId}/repay`, repayData)
      return response?.data || response
    } catch (error) {
      console.error('还款失败:', error)
      throw new Error('还款失败，请稍后重试')
    }
  },

  /**
   * 预约还款
   * @param {string} loanId - 贷款ID
   * @param {Object} scheduleData - 预约数据
   * @returns {Promise<Object>} 预约结果
   */
  scheduleRepayment: async (loanId, scheduleData) => {
    try {
      const response = await api.post(`/loans/${loanId}/schedule-repay`, scheduleData)
      return response?.data || response
    } catch (error) {
      console.error('预约还款失败:', error)
      throw new Error('预约还款失败，请稍后重试')
    }
  },

  /**
   * 获取还款记录
   * @param {string} loanId - 贷款ID
   * @returns {Promise<Array>} 还款记录列表
   */
  getRepaymentHistory: async (loanId) => {
    try {
      const response = await api.get(`/loans/${loanId}/repayment-history`)
      return response?.data || response
    } catch (error) {
      console.error('获取还款记录失败:', error)
      throw new Error('获取还款记录失败，请稍后重试')
    }
  },

  /**
   * 获取贷款进度
   * @param {string} loanId - 贷款ID
   * @returns {Promise<Object>} 贷款进度
   */
  getLoanProgress: async (loanId) => {
    try {
      const response = await api.get(`/loans/${loanId}/progress`)
      return response?.data || response
    } catch (error) {
      console.error('获取贷款进度失败:', error)
      throw new Error('获取贷款进度失败，请稍后重试')
    }
  }
}

export default loanService

