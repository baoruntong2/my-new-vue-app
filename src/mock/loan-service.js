// 贷款服务 Mock API
import { MockMethod } from 'vite-plugin-mock'

export default [
  // 获取预授信额度
  {
    url: '/api/loans/pre-approved',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          amount: 50000,
          rate: 4.35,
          message: '基于您的账户信息，我们为您评估了预授信额度'
        }
      }
    }
  },

  // 获取我的贷款列表
  {
    url: '/api/loans/my-loans',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            id: '1',
            loanNumber: 'LOAN20240101001',
            productName: '消费贷款',
            amount: 50000,
            remainingPrincipal: 35000,
            nextRepaymentDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            nextRepaymentAmount: 2500,
            status: 'active',
            rate: 4.35,
            term: '12个月'
          },
          {
            id: '2',
            loanNumber: 'LOAN20231215001',
            productName: '住房按揭贷款',
            amount: 800000,
            remainingPrincipal: 750000,
            nextRepaymentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            nextRepaymentAmount: 4500,
            status: 'active',
            rate: 4.35,
            term: '30年'
          }
        ]
      }
    }
  },

  // 申请消费贷款
  {
    url: '/api/loans/consumer/apply',
    method: 'post',
    response: (req) => {
      const { amount, term } = req.body
      // 模拟70%通过率
      const isApproved = Math.random() > 0.3
      return {
        code: 200,
        message: 'success',
        data: {
          id: `LOAN${Date.now()}`,
          status: isApproved ? 'approved' : 'pending',
          amount,
          term,
          rate: 4.35,
          monthlyPayment: Math.round((amount * 0.0435 / 12 * term) / term + amount / term)
        }
      }
    }
  },

  // 申请大额贷款（预审）
  {
    url: '/api/loans/large/pre-apply',
    method: 'post',
    response: (req) => {
      const { type, loanAmount, monthlyIncome } = req.body
      // 模拟预审逻辑
      const isApproved = monthlyIncome >= 5000 && loanAmount <= 1000000
      return {
        code: 200,
        message: 'success',
        data: {
          id: `LOAN${Date.now()}`,
          status: isApproved ? 'approved' : 'pending',
          message: isApproved 
            ? '预审通过，请上传相关材料' 
            : '建议补充材料以提高通过率',
          suggestions: isApproved ? [] : [
            '提供近6个月银行流水',
            '提供收入证明',
            '提供资产证明'
          ]
        }
      }
    }
  },

  // 上传贷款材料
  {
    url: '/api/loans/:loanId/documents',
    method: 'post',
    response: (req) => {
      return {
        code: 200,
        message: 'success',
        data: {
          loanId: req.url.split('/')[3],
          uploadedCount: Object.keys(req.body).length,
          message: '材料上传成功'
        }
      }
    }
  },

  // 获取客户经理列表
  {
    url: '/api/loans/managers',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            id: '1',
            name: '李经理',
            phone: '13800138001',
            branch: '总行营业部',
            address: '北京市朝阳区XX路XX号',
            distance: 1.2,
            specialty: ['房贷', '车贷'],
            rating: 4.8
          },
          {
            id: '2',
            name: '王经理',
            phone: '13800138002',
            branch: '海淀支行',
            address: '北京市海淀区XX路XX号',
            distance: 2.5,
            specialty: ['房贷'],
            rating: 4.9
          },
          {
            id: '3',
            name: '张经理',
            phone: '13800138003',
            branch: '西城支行',
            address: '北京市西城区XX路XX号',
            distance: 3.8,
            specialty: ['车贷'],
            rating: 4.7
          }
        ]
      }
    }
  },

  // 预约面签
  {
    url: '/api/loans/appointments',
    method: 'post',
    response: (req) => {
      return {
        code: 200,
        message: 'success',
        data: {
          appointmentId: `APT${Date.now()}`,
          ...req.body,
          status: 'confirmed'
        }
      }
    }
  },

  // 获取公积金信息
  {
    url: '/api/housing-fund/info',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          balance: 125680.50,
          monthlyDeposit: 2400,
          loanLimit: 800000,
          accountNumber: '1101234567890123456',
          status: 'active',
          lastUpdateDate: new Date().toISOString()
        }
      }
    }
  },

  // 申请公积金提取
  {
    url: '/api/housing-fund/withdraw',
    method: 'post',
    response: (req) => {
      return {
        code: 200,
        message: 'success',
        data: {
          withdrawalId: `WD${Date.now()}`,
          ...req.body,
          status: 'pending',
          message: '提取申请已提交，审核通过后1-3个工作日内到账'
        }
      }
    }
  },

  // 还款
  {
    url: '/api/loans/:loanId/repay',
    method: 'post',
    response: (req) => {
      return {
        code: 200,
        message: 'success',
        data: {
          repayId: `REP${Date.now()}`,
          loanId: req.url.split('/')[3],
          ...req.body,
          status: 'success',
          repayDate: new Date().toISOString()
        }
      }
    }
  },

  // 预约还款
  {
    url: '/api/loans/:loanId/schedule-repay',
    method: 'post',
    response: (req) => {
      return {
        code: 200,
        message: 'success',
        data: {
          scheduleId: `SCH${Date.now()}`,
          loanId: req.url.split('/')[3],
          ...req.body,
          status: 'scheduled'
        }
      }
    }
  },

  // 获取还款记录
  {
    url: '/api/loans/:loanId/repayment-history',
    method: 'get',
    response: (req) => {
      const loanId = req.url.split('/')[3]
      return {
        code: 200,
        message: 'success',
        data: [
          {
            id: '1',
            repayDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'normal',
            amount: 2500,
            principal: 2000,
            interest: 500,
            fee: 0,
            status: 'success'
          },
          {
            id: '2',
            repayDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'normal',
            amount: 2500,
            principal: 2000,
            interest: 500,
            fee: 0,
            status: 'success'
          }
        ]
      }
    }
  },

  // 获取贷款进度
  {
    url: '/api/loans/:loanId/progress',
    method: 'get',
    response: (req) => {
      return {
        code: 200,
        message: 'success',
        data: {
          loanId: req.url.split('/')[3],
          steps: [
            {
              status: 'submitted',
              title: '材料已提交',
              description: '等待客户经理初审',
              completed: true,
              current: false,
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              status: 'reviewing',
              title: '审批中',
              description: '银行正在审核您的申请',
              completed: false,
              current: true
            },
            {
              status: 'approved',
              title: '审批通过',
              description: '等待放款',
              completed: false,
              current: false
            },
            {
              status: 'disbursed',
              title: '已放款',
              description: '资金已划拨至指定账户',
              completed: false,
              current: false
            }
          ]
        }
      }
    }
  }
]

