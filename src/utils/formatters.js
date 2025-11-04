/**
 * 通用格式化工具函数
 * 包含日期、金额格式化及敏感信息脱敏等常用功能
 */

/**
 * 格式化日期为YYYY-MM-DD格式
 * @param {string|Date} date - 日期字符串或Date对象
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date) {
  if (!date) return '';
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(targetDate.getTime())) return '';

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * 格式化金额为带千分位的数字字符串
 * @param {number|string} amount - 金额数字或字符串
 * @param {number} decimalPlaces - 保留小数位数，默认2位
 * @returns {string} 格式化后的金额字符串
 */
export function formatCurrency(amount, decimalPlaces = 2) {
  if (amount === undefined || amount === null) return '0.00';

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0.00';

  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

/**
 * 身份证号脱敏处理
 * @param {string} idCard - 身份证号
 * @returns {string} 脱敏后的身份证号
 */
export function maskIdCard(idCard) {
  if (!idCard || idCard.length < 18) return idCard;
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
}

/**
 * 手机号脱敏处理
 * @param {string} phone - 手机号
 * @returns {string} 脱敏后的手机号
 */
export function maskPhone(phone) {
  if (!phone || phone.length < 11) return phone;
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 格式化日期时间为YYYY-MM-DD HH:MM格式
 * @param {string|Date} datetime - 日期时间字符串或Date对象
 * @returns {string} 格式化后的日期时间字符串
 */
export function formatDateTime(datetime) {
  if (!datetime) return '';
  const targetDate = typeof datetime === 'string' ? new Date(datetime) : datetime;
  if (isNaN(targetDate.getTime())) return '';

  const dateStr = formatDate(targetDate);
  const hours = String(targetDate.getHours()).padStart(2, '0');
  const minutes = String(targetDate.getMinutes()).padStart(2, '0');

  return `${dateStr} ${hours}:${minutes}`;
}

/**
 * 格式化数字为带单位的简洁表示（如1.2万，3.5亿）
 * @param {number} num - 要格式化的数字
 * @returns {string} 带单位的数字字符串
 */
export function formatNumberWithUnit(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';

  // 处理负数
  const sign = num < 0 ? '-' : '';
  const absNum = Math.abs(num);

  // 定义单位和对应的阈值
  const units = [
    { threshold: 1e8, unit: '亿' },
    { threshold: 1e4, unit: '万' },
    { threshold: 1, unit: '' }
  ];

  for (const { threshold, unit } of units) {
    if (absNum >= threshold) {
      const value = (absNum / threshold).toFixed(1);
      // 移除末尾的.0
      const formattedValue = parseFloat(value) === parseInt(value, 10) ? parseInt(value, 10) : value;
      return `${sign}${formattedValue}${unit}`;
    }
  }

  return num.toString();
}