import { createRouter, createWebHistory } from 'vue-router'

// 基础布局组件
const MainLayout = () => import('@/components/layouts/MainLayout.vue')

// 现金业务模块
const CashBusiness = () => import('@/views/cash/CashBusiness.vue')
const DepositWithdrawal = () => import('@/views/cash/DepositWithdrawal.vue')
const CurrencyExchange = () => import('@/views/cash/CurrencyExchange.vue')
const Counterfeit鉴定 = () => import('@/views/cash/CounterfeitDetection.vue')

// 非现金业务模块
const NonCashBusiness = () => import('@/views/noncash/NonCashBusiness.vue')
const AccountServices = () => import('@/views/noncash/personal/AccountServices.vue')
const PaymentServices = () => import('@/views/noncash/personal/PaymentServices.vue')
const CardServices = () => import('@/views/noncash/personal/CardServices.vue')
const LoanServices = () => import('@/views/noncash/personal/LoanServices.vue')
const InvestmentServices = () => import('@/views/noncash/personal/InvestmentServices.vue')
const ContractServices = () => import('@/views/noncash/personal/ContractServices.vue')

// 公共页面
const Home = () => import('@/views/HomeView.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '个人银行账户中心'
    }
  },
  {
    path: '/cash-business',
    name: 'cash-business',
    component: () => import('../views/cash/CashBusiness.vue'),
    meta: {
      title: '现金业务'
    }
  },

  {
    path: '/cash',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'CashBusiness',
        component: CashBusiness
      },
      {
        path: 'deposit-withdrawal',
        name: 'DepositWithdrawal',
        component: DepositWithdrawal
      },
      {
        path: 'currency-exchange',
        name: 'CurrencyExchange',
        component: CurrencyExchange
      },
      {
        path: 'counterfeit-detection',
        name: 'CounterfeitDetection',
        component: Counterfeit鉴定
      },
      {
        path: 'appointment',
        name: 'CashAppointment',
        component: () => import('../views/cash/CashAppointment.vue'),
        meta: {
          title: '现金业务预约'
        }
      }
    ]
  },
  {
    path: '/noncash',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'NonCashBusiness',
        component: NonCashBusiness
      },
      {
        path: 'account-services',
        name: 'AccountServices',
        component: AccountServices
      },
      {
        path: 'payment-services',
        name: 'PaymentServices',
        component: PaymentServices
      },
      {
        path: 'card-services',
        name: 'CardServices',
        component: CardServices
      },
      {
        path: 'loan-services',
        name: 'LoanServices',
        component: LoanServices
      },
      {
        path: 'investment-services',
        name: 'InvestmentServices',
        component: InvestmentServices
      },
      {
        path: 'contract-services',
        name: 'ContractServices',
        component: ContractServices
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router