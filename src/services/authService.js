/**
 * 身份验证相关API服务
 */
import axios from 'axios'
import { embeddedTestData } from '@/utils/embeddedTestData'

// 初始化全局用户索引（按优先级排序）
console.time('globalUserIndexInit');
const globalUserIndex = embeddedTestData.users
  .sort((a, b) => (a.priority || Number.MAX_SAFE_INTEGER) - (b.priority || Number.MAX_SAFE_INTEGER))
  .reduce((map, user) => {
    if (!map[user.phone] || user.priority < map[user.phone].priority) {
      map[user.phone] = user;
    }
    return map;
  }, {});
console.timeEnd('globalUserIndexInit');
console.log('全局用户索引创建完成，包含', Object.keys(globalUserIndex).length, '个用户');

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 发送验证码到手机
 * @param {string} phone - 手机号码
 * @returns {Promise}
 */
export function sendVerificationCode(phone) {
  console.time('sendVerificationCodeTotal');
  console.log('开始发送验证码流程:', phone);
  // 测试环境下使用嵌入式测试数据中的预设验证码
  if (import.meta.env.MODE === 'test') {
    console.time('sendVerificationCodeLookup');
const testUser = globalUserIndex[phone];
console.timeEnd('sendVerificationCodeLookup');
    if (testUser) {
      console.log('使用测试验证码:', testUser.verificationCode);
      return Promise.resolve({ data: { verificationCode: testUser.verificationCode } });
    }
  }

  console.timeEnd('sendVerificationCodeTotal');
  return api.post('/auth/send-code', { phone })
    .then(response => {
      console.log('验证码发送成功:', response.data);
      return response;
    })
    .catch(error => {
      console.error('验证码发送失败:', error.response?.data || error.message);
      throw error;
    });
}

/**
 * 验证用户身份信息
 * @param {Object} data - 用户身份信息
 * @param {string} data.name - 姓名
 * @param {string} data.idNumber - 身份证号
 * @param {string} data.phone - 手机号码
 * @param {string} data.verificationCode - 验证码
 * @returns {Promise}
 */
export function verifyUserIdentity(data) {
  // 测试环境下使用嵌入式测试数据验证身份
  if (import.meta.env.MODE === 'test') {
    // 按优先级排序并创建用户索引映射，确保高优先级用户优先匹配
console.time('userIndexCreation');
const userIndex = embeddedTestData.users
  .sort((a, b) => (a.priority || 0) - (b.priority || 0)) // 按优先级升序排序
  .reduce((map, user) => {
    // 仅保留同一手机号的最高优先级用户
    if (!map[user.phone] || user.priority < map[user.phone].priority) {
      map[user.phone] = user;
    }
    return map;
  }, {});
console.timeEnd('userIndexCreation');
const testUser = userIndex[data.phone] && userIndex[data.phone].idNumber === data.idNumber && userIndex[data.phone].name === data.name ? userIndex[data.phone] : null;

    if (testUser && testUser.verificationCode === data.verificationCode) {
      console.log('身份验证成功（测试环境）');
      return Promise.resolve({ data: { success: true, ...testUser } });
    } else {
      console.log('身份验证失败（测试环境）');
      return Promise.resolve({ data: { success: false, error: '身份信息或验证码不正确' } });
    }
  }

  return api.post('/auth/verify-identity', { ...data, idNumber: data.idCard, idCard: undefined })
}

/**
 * 模拟登录手机银行（实际项目中应替换为真实登录接口）
 * @param {Object} credentials - 登录凭证
 * @returns {Promise}
 */
export function login(credentials) {
  return api.post('/auth/login', credentials)
}

/**
 * 获取当前登录用户信息
 * @returns {Promise}
 */
export function getCurrentUser() {
  return api.get('/auth/current-user')
}

/**
 * 获取验证码图片和token
 * @returns {Promise}
 */
export function fetchCaptcha() {
  return api.get('/auth/captcha')
}

/**
 * 提交验证码并重新发送短信验证码
 * @param {Object} data - 验证码信息
 * @param {string} data.phone - 手机号码
 * @param {string} data.captchaCode - 验证码
 * @param {string} data.captchaToken - 验证码token
 * @returns {Promise}
 */
export function resendVerificationCode(data) {
  return api.post('/auth/resend-code', data)
}