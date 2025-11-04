// 独立代码验证数据集
// 用于验证代码基础运行能力与功能正确性的独立测试资源
 export const generateStandaloneTestCases = () => {
  return {
    // 正常用户数据 - 验证基本功能
    validUsers: [
      {
        id: 'TEST001',
        name: '王五',
        idNumber: '440101198506201234',
        phone: '13700137000',
        email: 'wang.wu@example.com',
        address: '广州市天河区珠江新城1号',
        testCaseType: 'normal',
        expectedResult: 'success'
      },
      {
        id: 'TEST002',
        name: '赵六',
        idNumber: '440301199009155678',
        phone: '13600136000',
        email: 'zhao.liu@example.com',
        address: '深圳市福田区深南大道1000号',
        testCaseType: 'normal',
        expectedResult: 'success'
      }
    ],
    // 边界情况测试 - 验证数据处理逻辑
    boundaryTestCases: [
      {
        id: 'EDGE001',
        name: '', // 空姓名
        idNumber: '440101198506201234',
        phone: '13700137000',
        email: 'invalid-email',
        address: '北京市海淀区中关村大街1号',
        testCaseType: 'empty_name',
        expectedResult: 'error',
        expectedErrorMessage: '姓名不能为空'
      },
      {
        id: 'EDGE002',
        name: '钱七',
        idNumber: '123456', // 无效身份证
        phone: '13500135000',
        email: 'qian.qi@example.com',
        address: '杭州市西湖区西湖大道1号',
        testCaseType: 'invalid_id',
        expectedResult: 'error',
        expectedErrorMessage: '身份证格式不正确'
      }
    ],
    // 异常数据测试 - 验证错误处理能力
    errorTestCases: [
      {
        id: 'ERROR001',
        name: '孙八',
        idNumber: '500101199512011234',
        phone: '13400134000', // 无效手机号
        email: 'sun.ba@example.com',
        address: '重庆市渝中区解放碑1号',
        testCaseType: 'invalid_phone',
        expectedResult: 'error',
        expectedErrorMessage: '手机号格式不正确'
      },
      {
        id: 'ERROR002',
        name: '周九',
        idNumber: '330101199805205678',
        phone: '13300133000',
        email: 'zhou.jiu@example.com',
        address: '', // 空地址
        testCaseType: 'empty_address',
        expectedResult: 'warning',
        expectedWarningMessage: '地址为空，建议补充'
      }
    ],
    // 接口调用测试 - 验证API交互
    apiTestCases: [
      {
        testId: 'API001',
        endpoint: '/api/user/info',
        method: 'GET',
        requestParams: { userId: 'TEST001' },
        expectedResponseCode: 200,
        expectedResponseTime: 300 // ms
      },
      {
        testId: 'API002',
        endpoint: '/api/user/update',
        method: 'POST',
        requestBody: { userId: 'TEST002', name: '赵六更新' },
        expectedResponseCode: 200,
        expectedResponseTime: 500 // ms
      }
    ]
  };
};