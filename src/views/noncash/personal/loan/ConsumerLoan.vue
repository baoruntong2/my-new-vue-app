<template>
  <div class="space-y-6">
    <!-- 预授信额度展示 -->
    <div v-if="preApprovedInfo" class="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-white/80 text-sm mb-1">您的预授信额度</p>
          <p class="text-4xl font-bold mb-2">¥{{ preApprovedInfo.amount.toLocaleString() }}</p>
          <p class="text-white/90 text-sm">年利率低至 {{ preApprovedInfo.rate }}%</p>
        </div>
        <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <button
        @click="startApplication"
        class="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
      >
        立即申请
      </button>
    </div>

    <!-- 申请表单 -->
    <div v-if="showForm" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">消费贷款申请</h3>

      <!-- 步骤指示器 -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center flex-1">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              :class="currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
              1
            </div>
            <span class="ml-2 text-sm" :class="currentStep >= 1 ? 'text-primary font-medium' : 'text-gray-500'">填写信息</span>
          </div>
          <div class="flex-1 h-0.5 mx-4" :class="currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'"></div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              :class="currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
              2
            </div>
            <span class="ml-2 text-sm" :class="currentStep >= 2 ? 'text-primary font-medium' : 'text-gray-500'">身份验证</span>
          </div>
          <div class="flex-1 h-0.5 mx-4" :class="currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'"></div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              :class="currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'">
              3
            </div>
            <span class="ml-2 text-sm" :class="currentStep >= 3 ? 'text-primary font-medium' : 'text-gray-500'">确认签约</span>
          </div>
        </div>
      </div>

      <!-- 步骤1: 填写信息 -->
      <div v-if="currentStep === 1" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">借款金额（元）<span class="text-red-500">*</span></label>
          <div class="relative">
            <input
              type="number"
              v-model.number="formData.amount"
              :min="1000"
              :max="preApprovedInfo?.amount || 50000"
              step="1000"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入借款金额"
            >
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
          </div>
          <p class="text-xs text-gray-500 mt-1">可借额度：¥1,000 - ¥{{ (preApprovedInfo?.amount || 50000).toLocaleString() }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">借款期限<span class="text-red-500">*</span></label>
          <div class="grid grid-cols-3 gap-3">
            <button
              v-for="term in loanTerms"
              :key="term.value"
              @click="formData.term = term.value"
              class="px-4 py-2 border-2 rounded-lg transition-all"
              :class="formData.term === term.value 
                ? 'border-primary bg-primary/5 text-primary font-medium' 
                : 'border-gray-200 hover:border-gray-300'"
            >
              {{ term.label }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">收款账户<span class="text-red-500">*</span></label>
          <select
            v-model="formData.receiveAccount"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">请选择收款账户</option>
            <option v-for="account in accounts" :key="account.id" :value="account.id">
              {{ account.name }} ({{ account.number }})
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">还款账户<span class="text-red-500">*</span></label>
          <select
            v-model="formData.repayAccount"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">请选择还款账户</option>
            <option v-for="account in accounts" :key="account.id" :value="account.id">
              {{ account.name }} ({{ account.number }})
            </option>
          </select>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
          <div class="flex">
            <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-sm text-blue-700">
              <p class="font-medium mb-1">预计月还款额</p>
              <p class="text-lg font-bold">¥{{ calculateMonthlyPayment.toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <div class="flex items-start">
          <input
            type="checkbox"
            id="agreeTerms"
            v-model="formData.agreeTerms"
            class="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          >
          <label for="agreeTerms" class="ml-2 text-sm text-gray-700">
            我已阅读并同意
            <a href="#" class="text-primary hover:underline">《消费贷款服务协议》</a>
            和
            <a href="#" class="text-primary hover:underline">《个人信息授权书》</a>
          </label>
        </div>

        <button
          @click="nextStep"
          :disabled="!canProceedStep1"
          class="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一步：身份验证
        </button>
      </div>

      <!-- 步骤2: 身份验证 -->
      <div v-if="currentStep === 2" class="space-y-4">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-gray-800 mb-2">身份验证</h4>
          <p class="text-sm text-gray-500">为了保障您的账户安全，请完成身份验证</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">手机验证码</label>
          <div class="flex gap-3">
            <input
              type="text"
              v-model="formData.verifyCode"
              maxlength="6"
              class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入6位验证码"
            >
            <button
              @click="sendVerifyCode"
              :disabled="codeCountdown > 0"
              class="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ codeCountdown > 0 ? `${codeCountdown}秒` : '发送验证码' }}
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">验证码将发送至手机号：{{ userPhone }}</p>
        </div>

        <div class="flex gap-3">
          <button
            @click="prevStep"
            class="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            上一步
          </button>
          <button
            @click="verifyAndNext"
            :disabled="!formData.verifyCode || formData.verifyCode.length !== 6"
            class="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            验证并提交
          </button>
        </div>
      </div>

      <!-- 步骤3: 审批结果/签约 -->
      <div v-if="currentStep === 3" class="space-y-4">
        <div v-if="approvalResult.status === 'approved'" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h4 class="text-xl font-semibold text-gray-800 mb-2">审批通过</h4>
          <p class="text-sm text-gray-500 mb-6">恭喜！您的贷款申请已通过审批</p>

          <div class="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h5 class="font-semibold text-gray-800 mb-4">合同信息</h5>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">贷款金额：</span>
                <span class="font-semibold text-gray-800">¥{{ approvalResult.amount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">年利率：</span>
                <span class="font-semibold text-gray-800">{{ approvalResult.rate }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">借款期限：</span>
                <span class="font-semibold text-gray-800">{{ approvalResult.term }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">月还款额：</span>
                <span class="font-semibold text-gray-800">¥{{ approvalResult.monthlyPayment.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-start mb-6">
            <input
              type="checkbox"
              id="agreeContract"
              v-model="formData.agreeContract"
              class="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            >
            <label for="agreeContract" class="ml-2 text-sm text-gray-700">
              我已阅读并同意上述合同条款，确认无误后进行电子签名
            </label>
          </div>

          <button
            @click="confirmSign"
            :disabled="!formData.agreeContract"
            class="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            确认签约
          </button>
        </div>

        <div v-else-if="approvalResult.status === 'pending'" class="text-center">
          <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-amber-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
          <h4 class="text-xl font-semibold text-gray-800 mb-2">审核中</h4>
          <p class="text-sm text-gray-500 mb-6">您的申请已进入人工审核流程，预计2小时内告知结果</p>
          <button
            @click="resetForm"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>

    <!-- 成功页面 -->
    <div v-if="showSuccess" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">签约成功</h3>
      <p class="text-gray-600 mb-6">资金将在T+0分钟内划拨至您的收款账户</p>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p class="text-sm text-blue-800">
          <span class="font-semibold">贷款编号：</span>{{ loanNumber }}
        </p>
      </div>
      <button
        @click="resetForm"
        class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
      >
        返回我的贷款
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLoanStore } from '@/stores/loanStore'
import { useAccountStore } from '@/stores/accountStore'
import { useAuthStore } from '@/stores/authStore'

const loanStore = useLoanStore()
const accountStore = useAccountStore()
const authStore = useAuthStore()

// 预授信信息
const preApprovedInfo = ref(null)

// 表单显示状态
const showForm = ref(false)
const showSuccess = ref(false)
const currentStep = ref(1)
const codeCountdown = ref(0)

// 用户手机号（内测账户"张三"）
const userPhone = computed(() => authStore.userInfo?.phone || '138****8888')

// 账户列表
const accounts = computed(() => accountStore.userInfo.accounts || [])

// 借款期限选项
const loanTerms = [
  { value: 3, label: '3个月' },
  { value: 6, label: '6个月' },
  { value: 12, label: '12个月' }
]

// 表单数据
const formData = ref({
  amount: 0,
  term: 3,
  receiveAccount: '',
  repayAccount: '',
  agreeTerms: false,
  verifyCode: '',
  agreeContract: false
})

// 审批结果
const approvalResult = ref(null)
const loanNumber = ref('')

// 计算月还款额
const calculateMonthlyPayment = computed(() => {
  if (!formData.value.amount || !formData.value.term) return 0
  const rate = (preApprovedInfo.value?.rate || 4.35) / 100 / 12
  const months = formData.value.term
  const temp = Math.pow(1 + rate, months)
  return Math.round((formData.value.amount * rate * temp) / (temp - 1))
})

// 是否可以进入下一步（步骤1）
const canProceedStep1 = computed(() => {
  return formData.value.amount >= 1000 &&
         formData.value.amount <= (preApprovedInfo.value?.amount || 50000) &&
         formData.value.term &&
         formData.value.receiveAccount &&
         formData.value.repayAccount &&
         formData.value.agreeTerms
})

// 开始申请
const startApplication = () => {
  showForm.value = true
  currentStep.value = 1
  // 设置默认值
  formData.value.amount = Math.min(10000, preApprovedInfo.value?.amount || 10000)
  formData.value.receiveAccount = accounts.value[0]?.id || ''
  formData.value.repayAccount = accounts.value[0]?.id || ''
}

// 下一步
const nextStep = () => {
  if (currentStep.value === 1 && canProceedStep1.value) {
    currentStep.value = 2
  }
}

// 上一步
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// 发送验证码
const sendVerifyCode = async () => {
  try {
    // 模拟发送验证码
    codeCountdown.value = 60
    const timer = setInterval(() => {
      codeCountdown.value--
      if (codeCountdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    
    window.$notify.success({
      title: '验证码已发送',
      message: `验证码已发送至 ${userPhone.value}`,
      duration: 3000
    })
    
    // 模拟验证码（开发环境）
    if (import.meta.env.DEV) {
      formData.value.verifyCode = '123456'
    }
  } catch (error) {
    window.$notify.error({
      title: '发送失败',
      message: '验证码发送失败，请稍后重试',
      duration: 5000
    })
  }
}

// 验证并提交
const verifyAndNext = async () => {
  try {
    // 模拟验证码验证（开发环境自动通过）
    if (formData.value.verifyCode !== '123456' && !import.meta.env.DEV) {
      window.$notify.error({
        title: '验证失败',
        message: '验证码错误，请重新输入',
        duration: 5000
      })
      return
    }

    // 提交申请
    const result = await loanStore.applyConsumerLoan({
      amount: formData.value.amount,
      term: formData.value.term,
      receiveAccount: formData.value.receiveAccount,
      repayAccount: formData.value.repayAccount
    })

    // 模拟审批结果（70%通过率）
    const isApproved = Math.random() > 0.3
    approvalResult.value = {
      status: isApproved ? 'approved' : 'pending',
      amount: formData.value.amount,
      rate: preApprovedInfo.value?.rate || 4.35,
      term: `${formData.value.term}个月`,
      monthlyPayment: calculateMonthlyPayment.value
    }

    if (isApproved) {
      currentStep.value = 3
    } else {
      currentStep.value = 3
    }
  } catch (error) {
    window.$notify.error({
      title: '申请失败',
      message: error.message || '申请提交失败，请稍后重试',
      duration: 5000
    })
  }
}

// 确认签约
const confirmSign = async () => {
  try {
    // 生成贷款编号
    loanNumber.value = `LOAN${Date.now()}`
    
    window.$notify.success({
      title: '签约成功',
      message: '资金将在T+0分钟内划拨至您的收款账户',
      duration: 5000
    })

    showForm.value = false
    showSuccess.value = true
    
    // 刷新贷款列表
    await loanStore.fetchMyLoans()
  } catch (error) {
    window.$notify.error({
      title: '签约失败',
      message: error.message || '签约操作失败，请稍后重试',
      duration: 5000
    })
  }
}

// 重置表单
const resetForm = () => {
  showForm.value = false
  showSuccess.value = false
  currentStep.value = 1
  formData.value = {
    amount: 0,
    term: 3,
    receiveAccount: '',
    repayAccount: '',
    agreeTerms: false,
    verifyCode: '',
    agreeContract: false
  }
  approvalResult.value = null
  loanNumber.value = ''
}

// 初始化
onMounted(async () => {
  try {
    await loanStore.fetchPreApprovedAmount()
    preApprovedInfo.value = {
      amount: loanStore.preApprovedAmount,
      rate: loanStore.preApprovedRate
    }
    await accountStore.fetchUserInfo()
  } catch (error) {
    console.error('初始化失败:', error)
  }
})
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

