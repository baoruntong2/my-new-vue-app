// 独立的Express模拟服务器
const express = require('express');
const app = express();
const port = 3000;

// 业务类型模拟数据
const businessTypes = [
  { value: 'deposit', label: '存款', code: '001', description: '现金存款业务', steps: ['填写金额', '确认信息', '完成办理'] },
  { value: 'withdrawal', label: '取款', code: '002', description: '现金取款业务', steps: ['填写金额', '选择面额', '确认信息', '完成办理'] },
  { value: 'changeExchange', label: '零钱兑换', code: '003', description: '纸币零钱兑换', steps: ['选择兑换类型', '填写金额', '确认信息', '完成办理'] },
  { value: 'damagedExchange', label: '残币兑换', code: '004', description: '残缺污损人民币兑换', steps: ['选择兑换类型', '填写金额', '确认信息', '完成办理'] },
  { value: 'newNoteExchange', label: '新币兑换', code: '005', description: '新版人民币兑换', steps: ['选择面额', '填写数量', '确认信息', '完成办理'] }
];

// 启用CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 模拟API端点
app.get('/api/business-types/cash', (req, res) => {
  setTimeout(() => {
    res.json({
      code: 200,
      message: 'success',
      data: businessTypes
    });
  }, 500); // 添加小延迟模拟网络请求
});

// 启动服务器
app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});

module.exports = app;