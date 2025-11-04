import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    // 预约激活状态
    isActive: false,
    // 服务类型（从存取款服务激活时传入）
    serviceType: null,
    // 当前步骤
    currentStep: 1,
    // 预约编号
    appointmentNo: '',
    // 用户信息
    userInfo: {
      name: '',
      idCard: '',
      phone: '',
      customerId: '',
      isLoggedIn: false,
      gender: '' // 性别：male/female
    },

    // 业务信息
    businessInfo: {
      type: '',
      details: {}
    },

    // 网点信息
    branchInfo: {
      id: null,
      name: '',
      address: '',
      phone: '',
      distance: 0,
      queueCount: 0,
      businessHours: '',
      largeCashSupport: false,
      newNotesSupport: false
    },

    // 预约时间
    appointmentDate: null,
    appointmentTime: ''
  }),

  actions: {
    // 设置用户信息
    setUserInfo(info) {
      this.userInfo = {
        ...this.userInfo,
        ...info
      };
    },

    // 设置业务信息
    setBusinessInfo(info) {
      this.businessInfo = {
        ...this.businessInfo,
        ...info
      };
    },

    // 激活预约程序
    activateAppointment() {
      // 可以在这里添加激活预约程序的相关逻辑
      this.isActive = true;
    },

    // 设置服务类型
    setServiceType(serviceType) {
      this.serviceType = serviceType;
      // 如果是从存取款服务激活，自动设置业务类型
      if (serviceType === 'deposit' || serviceType === 'withdrawal') {
        this.businessInfo.type = serviceType;
      }
    },
    
    // 设置当前步骤
    setCurrentStep(step) {
      this.currentStep = step;
    },
    
    // 设置预约编号
    setAppointmentNo(no) {
      this.appointmentNo = no;
    },

    // 设置网点信息
    setBranchInfo(branch) {
      this.branchInfo = {
        ...this.branchInfo,
        ...branch
      };
    },

    // 设置预约日期
    setAppointmentDate(date) {
      this.appointmentDate = date;
    },

    // 设置预约时间
    setAppointmentTime(time) {
      this.appointmentTime = time;
    },

    // 清空预约信息
    clearAppointmentInfo() {
      this.businessInfo = {
        type: '',
        details: {}
      };
      this.branchInfo = {
        id: null,
        name: '',
        address: '',
        phone: '',
        distance: 0,
        queueCount: 0,
        businessHours: '',
        largeCashSupport: false,
        newNotesSupport: false
      };
      this.appointmentDate = null;
      this.appointmentTime = '';
    },

    // 检查用户登录状态
    async checkLoginStatus() {
      try {
        // 检查 authStore 中的登录状态
        const authStore = useAuthStore();
        
        if (authStore.isAuthenticated && authStore.userInfo) {
          return {
            name: authStore.userInfo.name || '',
            idCard: authStore.userInfo.idNumber || '',
            phone: authStore.userInfo.phone || '',
            customerId: authStore.userInfo.customerId || '',
            isLoggedIn: true,
            gender: authStore.userInfo.gender || ''
          };
        }
        return null;
      } catch (error) {
        console.error('检查登录状态失败:', error);
        return null;
      }
    },

    // 检查用户状态（兼容方法）
    async checkUserStatus() {
      const userInfo = await this.checkLoginStatus();
      return userInfo || this.userInfo;
    }
  },

  getters: {
    // 检查是否可以进入下一步（确认预约）
    canProceedToConfirm: (state) => {
      return (
        state.userInfo.name &&
        state.businessInfo.type &&
        state.branchInfo.id &&
        state.appointmentDate &&
        state.appointmentTime
      );
    },

    // 获取业务类型中文名称
    businessTypeName: (state) => {
      const typeMap = {
        'deposit': '存款',
        'withdrawal': '取款',
        'change': '零钱及残币兑换',
        'new-notes': '新钞兑换',
        'changeExchange': '兑换零钱',
        'damagedExchange': '兑换残币/破损币'
      };
      return typeMap[state.businessInfo.type] || '未选择';
    }
  }
})