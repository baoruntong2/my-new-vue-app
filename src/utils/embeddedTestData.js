// 嵌入式系统测试数据集
// 用于验证系统流程设计的完整性与逻辑合理性
 export const embeddedTestData = {
  // 预设用户信息 - 系统环境组成部分
  users: [
    { id: 'USER001',
      priority: 1,
      name: '张三',
      idNumber: '110101199001011237',
      phone: '13800138000',
      email: 'zhang.san@example.com',
      address: '北京市朝阳区建国路88号',
      // 预设生成数据
      verificationCode: '654321',
      tempToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      sessionId: 'SESSION_EMBEDDED_001',
      permissions: ['read', 'write', 'approve'],
      accountStatus: 'active',
      // 业务相关预设数据
      accountBalance: 156800.75,
      transactionLimit: 50000,
      recentTransactions: [
        { id: 'TRX001', amount: 2000, type: 'deposit', status: 'completed' },
        { id: 'TRX002', amount: 500, type: 'withdrawal', status: 'completed' }
      ]
    },
    { id: 'USER002',
      priority: 2,
      name: '李四',
      idNumber: '310101199203155678',
      phone: '13900139000',
      email: 'li.si@example.com',
      address: '上海市浦东新区陆家嘴环路1000号',
      verificationCode: '987654',
      tempToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      sessionId: 'SESSION_EMBEDDED_002',
      permissions: ['read'],
      accountStatus: 'frozen',
      accountBalance: 89500.20,
      transactionLimit: 10000,
      recentTransactions: []
    }
  ],
  // 系统流程测试场景
  testScenarios: {
    authentication: {
      successCase: { inputPhone: '13800138000', expectedCode: '654321', expectedToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
      failureCase: { inputPhone: '13800138000', expectedCode: '123456', expectedError: '验证码错误' }
    },
    authorization: {
      validPermissionCase: { userId: 'USER001', action: 'approve', expectedResult: true },
      invalidPermissionCase: { userId: 'USER002', action: 'approve', expectedResult: false }
    }
  }
};