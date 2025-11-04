import api from '@/services/api'

/**
 * 预约服务模块 - 处理现金业务预约相关API调用
 */
const appointmentService = {
  /**
   * 获取业务类型配置
   * @returns {Promise<Array>} 业务类型列表
   */
  getBusinessTypes: async () => {
    try {
      const response = await api.get('/business-types/cash')
      // api 已做一次解包：Mock 返回 { code, message, data }
      // 这里统一返回数组数据，兼容直连真实后端时仅返回数组的情况
      return response?.data ?? response
    } catch (error) {
      console.error('获取业务类型失败:', error)
      throw new Error('获取业务类型配置失败，请刷新页面重试')
    }
  },

  /**
   * 获取银行网点列表
   * @param {Object} params - 查询参数
   * @param {string} params.city - 城市代码
   * @param {string} params.district - 区域代码
   * @returns {Promise<Array>} 网点列表
   */
  getBranches: async (params) => {
    try {
      const response = await api.get('/branches', { params })
      return response.data
    } catch (error) {
      console.error('获取网点列表失败:', error)
      throw new Error('获取网点信息失败，请稍后重试')
    }
  },

  /**
   * 获取网点可用时段
   * @param {string} branchId - 网点ID
   * @param {string} date - 日期（YYYY-MM-DD）
   * @returns {Promise<Array>} 可用时段列表
   */
  getAvailableTimeSlots: async (branchId, date) => {
    try {
      const response = await api.get(`/branches/${branchId}/time-slots`, {
        params: { date }
      })
      return response.data
    } catch (error) {
      console.error(`获取网点${branchId}时段失败:`, error)
      throw new Error('获取预约时段失败，请稍后重试')
    }
  },

  /**
   * 提交预约申请
   * @param {Object} appointmentData - 预约数据
   * @returns {Promise<Object>} 预约结果
   */
  submitAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData)
      return response.data
    } catch (error) {
      console.error('提交预约失败:', error)
      // 处理特定错误类型
      if (error.response && error.response.status === 409) {
        throw new Error('您已在该时段预约了相同业务，请选择其他时段')
      }
      throw new Error('预约提交失败，请检查网络连接或稍后重试')
    }
  },

  /**
   * 获取预约详情
   * @param {string} appointmentId - 预约ID
   * @returns {Promise<Object>} 预约详情
   */
  getAppointmentDetail: async (appointmentId) => {
    try {
      const response = await api.get(`/appointments/${appointmentId}`)
      return response.data
    } catch (error) {
      console.error(`获取预约${appointmentId}详情失败:`, error)
      throw new Error('获取预约详情失败，请稍后重试')
    }
  },

  /**
   * 取消预约
   * @param {string} appointmentId - 预约ID
   * @returns {Promise<Object>} 取消结果
   */
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await api.post(`/appointments/${appointmentId}/cancel`)
      return response.data
    } catch (error) {
      console.error(`取消预约${appointmentId}失败:`, error)
      throw new Error('取消预约失败，请稍后重试')
    }
  }
}

export default appointmentService