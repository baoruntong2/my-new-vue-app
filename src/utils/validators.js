/**
 * 身份证号码验证
 * @param {string} idCard - 身份证号码
 * @returns {{valid: boolean, message: string}} 验证结果
 */
export function verifyIdCard(idCard) {
  if (!idCard || typeof idCard !== 'string') {
    return { valid: false, message: '请输入身份证号' };
  }
  
  // 内测账户身份证白名单：命中则直接放行
  const TEST_ID_CARDS = [
    '110101199001011234', // 测试账户1
    '110101199002022345'  // 测试账户2
  ];
  if (TEST_ID_CARDS.includes(idCard)) {
    return { valid: true, message: '' };
  }
  
  // 严格的身份证验证规则（18位）
  const reg = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!reg.test(idCard)) {
    return { valid: false, message: '身份证号格式不正确，应为18位' };
  }

  // 地区码验证（前6位）
  const regionCode = parseInt(idCard.substr(0, 2));
  if (regionCode < 11 || regionCode > 82) {
    return { valid: false, message: '身份证号地区码无效' };
  }

  // 出生日期验证
  const year = parseInt(idCard.substr(6, 4));
  const month = parseInt(idCard.substr(10, 2)) - 1; // 月份从0开始
  const day = parseInt(idCard.substr(12, 2));
  const birthDate = new Date(year, month, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month ||
    birthDate.getDate() !== day
  ) {
    return { valid: false, message: '身份证号出生日期无效' };
  }

  // 校验码验证
  const factors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard.charAt(i)) * factors[i];
  }
  const checkCode = parityBit[sum % 11];
  const isValid = checkCode.toUpperCase() === idCard.charAt(17).toUpperCase();
  
  if (!isValid) {
    return { valid: false, message: '身份证号校验码错误' };
  }
  
  return { valid: true, message: '' };
}

/**
 * 测试账户手机号列表
 */
const TEST_PHONE_NUMBERS = [
  '13800138000', // 测试账户1
  '13900139000'  // 测试账户2
];

/**
 * 手机号码验证
 * @param {string} phone - 手机号码
 * @param {string} idCard - 身份证号（可选，用于测试账户检查）
 * @returns {{valid: boolean, message: string}} 验证结果
 */
export function verifyPhone(phone, idCard = '') {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, message: '请输入手机号码' };
  }
  
  // 检查是否为测试账户手机号
  if (TEST_PHONE_NUMBERS.includes(phone)) {
    // 如果是测试账户，检查身份证号是否匹配
    const testAccounts = {
      '13800138000': '110101199001011234',
      '13900139000': '110101199002022345'
    };
    
    // 如果提供了身份证号，检查是否匹配
    if (idCard && testAccounts[phone] && testAccounts[phone] !== idCard) {
      return { valid: false, message: '手机号与身份证号不匹配' };
    }
    
    // 测试账户手机号直接通过
    return { valid: true, message: '' };
  }
  
  // 普通手机号验证
  const cleanedPhone = phone.replace(/\s/g, '');
  // 支持带区号和不带区号的手机号格式
  const reg = /^(\+86)?1[3-9]\d{9}$/;
  
  if (!reg.test(cleanedPhone)) {
    return { valid: false, message: '请输入有效的手机号码（11位，以1开头）' };
  }
  
  return { valid: true, message: '' };
}

/**
 * 验证码验证
 * @param {string} code - 验证码
 * @param {number} length - 验证码长度，默认6位
 * @returns {boolean} 是否有效
 */
export function verifyVerificationCode(code, length = 6) {
  if (!code || typeof code !== 'string') return false;
  // 简单验证：检查是否全部是数字且长度符合要求
  return /^\d+$/.test(code) && code.length === length;
}