import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: { name: '', idNumber: '', phone: '', permissions: [] },
    isAuthenticated: false,
    verificationCode: '',
    codeExpires: 0
  }),
  actions: {
    setUserInfo(info) {
      this.userInfo = { ...this.userInfo, ...info };
    },
    setIsAuthenticated(value) {
      this.isAuthenticated = value;
    },
    clearUserInfo() {
      this.userInfo = null
      this.isAuthenticated = false
    },
    setVerificationCode(code, expiresIn = 180) {
      this.verificationCode = code
      this.codeExpires = Date.now() + expiresIn * 1000
    },
    isCodeValid() {
      return Date.now() < this.codeExpires && this.verificationCode
    }
  },
  getters: {


    userName() {
      return this.userInfo?.name || ''
    },
    userPhone() {
      return this.userInfo?.phone || ''
    },
    userIdCard() {
      return this.userInfo?.idNumber || ''
    }
  }
})
