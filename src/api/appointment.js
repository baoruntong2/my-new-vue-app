/**
 * 预约相关API接口
 * 提供现金业务预约流程中的身份验证、验证码发送和预约提交等功能
 */
import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 发送手机验证码
 * @param {string} phone - 手机号码
 * @returns {Promise<Object>} - 包含验证码发送结果的Promise
 */
export function sendSmsCode(phone) {
  return new Promise((resolve, reject) => {
    // 模拟API请求延迟
    setTimeout(() => {
      if (!/^1[3-9]\d{9}$/.test(phone)) {
        reject(new Error('请输入有效的手机号码'));
        return;
      }

      // 模拟验证码发送成功
      resolve({
        success: true,
        message: '验证码已发送，请注意查收',
        requestId: Math.random().toString(36).substr(2, 9)
      });
    }, 800);
  });
}

/**
 * 验证访客身份信息
 * @param {Object} visitorInfo - 访客信息对象
 * @param {string} visitorInfo.name - 姓名
 * @param {string} visitorInfo.idCard - 身份证号
 * @param {string} visitorInfo.phone - 手机号码
 * @param {string} visitorInfo.smsCode - 短信验证码
 * @returns {Promise<Object>} - 包含验证结果的Promise
 */
export function verifyVisitor(visitorInfo) {
  return new Promise((resolve, reject) => {
    // 模拟API请求延迟
    setTimeout(() => {
      // 测试账户配置
      const TEST_ACCOUNTS = {
        '110101199001011234': {
          phone: '13800138000',
          verifyCode: '123456',
          name: '张三',
          customerId: 'TEST_USER_001'
        },
        '110101199002022345': {
          phone: '13900139000',
          verifyCode: '654321',
          name: '李四',
          customerId: 'TEST_USER_002'
        }
      };

      // 检查是否为测试账户
      const testAccount = TEST_ACCOUNTS[visitorInfo.idCard];
      if (testAccount && testAccount.phone === visitorInfo.phone) {
        // 测试账户验证
        if (testAccount.verifyCode !== visitorInfo.smsCode) {
          reject(new Error('验证码错误'));
          return;
        }
        
        // 测试账户直接通过验证
        resolve({
          success: true,
          message: '身份验证成功（测试账户）',
          data: {
            customerId: testAccount.customerId,
            name: testAccount.name || visitorInfo.name,
            idCard: visitorInfo.idCard,
            phone: visitorInfo.phone,
            token: 'TEST_TOKEN_' + Date.now()
          }
        });
        return;
      }

      // 普通账户验证逻辑
      if (!visitorInfo.name || visitorInfo.name.trim().length === 0) {
        reject(new Error('请输入姓名'));
        return;
      }

      if (!/^\d{17}[\dXx]$/.test(visitorInfo.idCard)) {
        reject(new Error('请输入有效的身份证号码'));
        return;
      }

      // 手机号验证（支持测试账户）
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(visitorInfo.phone)) {
        reject(new Error('请输入有效的手机号码'));
        return;
      }

      if (!visitorInfo.smsCode || visitorInfo.smsCode.length !== 6) {
        reject(new Error('请输入6位验证码'));
        return;
      }

      // 模拟验证成功
      resolve({
        success: true,
        message: '身份验证成功',
        data: {
          customerId: `VISITOR_${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
          name: visitorInfo.name,
          idCard: visitorInfo.idCard,
          phone: visitorInfo.phone,
          token: Math.random().toString(36).substr(2, 16)
        }
      });
    }, 1000);
  });
}

/**
 * 提交预约信息
 * @param {Object} appointmentData - 预约信息对象
 * @returns {Promise<Object>} - 包含预约结果的Promise
 */
export function submitAppointment(appointmentData) {
  return new Promise((resolve, reject) => {
    // 模拟API请求延迟
    setTimeout(() => {
      // 简单验证预约数据
      if (!appointmentData.businessType) {
        reject(new Error('请选择业务类型'));
        return;
      }

      if (!appointmentData.amount || appointmentData.amount <= 0) {
        reject(new Error('请输入有效的金额'));
        return;
      }

      if (!appointmentData.branchId) {
        reject(new Error('请选择预约网点'));
        return;
      }

      if (!appointmentData.appointmentDate) {
        reject(new Error('请选择预约日期'));
        return;
      }

      // 模拟预约成功
      resolve({
        success: true,
        message: '预约提交成功',
        data: {
          appointmentId: `APPT_${Date.now()}_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          appointmentNo: `XN${Date.now().toString().substr(-8)}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          qrCodeUrl: `/api/qrcode/${Date.now()}.png`,
          appointmentTime: new Date().toISOString()
        }
      });
    }, 1200);
  });
}