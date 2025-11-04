import axios from 'axios';
import { verifyIdCard, verifyPhone } from '../utils/validators';

// 在开发环境使用同源 '/api' 以便命中 Vite Mock；生产可通过 VITE_API_URL 覆盖
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// 创建API实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Request-ID': typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9)
  },
  timeout: 10000
});

// 请求拦截器 - 合并数据验证和认证功能
api.interceptors.request.use(
  (config) => {
    // 实际项目中添加认证token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 业务数据验证
    if (config.data && typeof config.data === 'object') {
      // 身份证验证
      if (config.data.idCard && !verifyIdCard(config.data.idCard)) {
        throw new Error('身份证格式不正确');
      }
      // 手机号验证
      if (config.data.phone && !verifyPhone(config.data.phone)) {
        throw new Error('手机号格式不正确');
      }
      // 请求签名
      config.headers['X-Signature'] = btoa(JSON.stringify(config.data) + new Date().toDateString());
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器 - 错误处理
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorCode = error.response?.status;
    const errorMsg = error.response?.data?.message || error.message || '请求失败，请稍后重试';
    
    // 使用通知组件显示错误信息
    if (typeof window.$notify !== 'undefined') {
      switch(errorCode) {
        case 400: window.$notify.error({ title: '错误', message: '请求参数错误，请检查输入', duration: 5000 }); break;
        case 401: window.$notify.warning({ title: '警告', message: '身份验证失败，请重新登录', duration: 5000 }); window.location.href = '/login'; break;
        case 403: window.$notify.error({ title: '错误', message: '没有操作权限，请联系管理员', duration: 5000 }); break;
        case 404: window.$notify.error({ title: '错误', message: '请求资源不存在', duration: 5000 }); break;
        case 500: window.$notify.error({ title: '错误', message: '服务器内部错误，请稍后再试', duration: 5000 }); break;
        default: window.$notify.error({ title: '错误', message: errorMsg, duration: 5000 });
      }
    }
    return Promise.reject(new Error(errorMsg));
  }
);

// 现金业务API
export const cashApi = {
  getExchangeRates: () => api.get('/exchange-rates'),
  createTransaction: (data) => api.post('/cash/transactions', data),
  getTransactionHistory: () => api.get('/cash/transactions')
};

// 非现金业务API
export const nonCashApi = {
  getAccounts: () => api.get('/accounts'),
  applyLoan: (data) => api.post('/loans/apply', data),
  getPaymentHistory: () => api.get('/payments/history')
};

export default api;