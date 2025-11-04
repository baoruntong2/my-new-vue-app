// 业务类型模拟数据
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/business-types/cash',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          { value: 'deposit', label: '存款', code: '001', description: '现金存款业务', steps: ['填写金额', '确认信息', '完成办理'] },
          { value: 'withdrawal', label: '取款', code: '002', description: '现金取款业务', steps: ['填写金额', '选择面额', '确认信息', '完成办理'] },
          { value: 'changeExchange', label: '零钱兑换', code: '003', description: '纸币零钱兑换', steps: ['选择兑换类型', '填写金额', '确认信息', '完成办理'] },
          { value: 'damagedExchange', label: '残币兑换', code: '004', description: '残缺污损人民币兑换', steps: ['选择兑换类型', '填写金额', '确认信息', '完成办理'] },
          { value: 'newNoteExchange', label: '新币兑换', code: '005', description: '新版人民币兑换', steps: ['选择面额', '填写数量', '确认信息', '完成办理'] }
        ]
      }
    }
  }
]