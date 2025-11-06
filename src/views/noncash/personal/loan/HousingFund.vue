<template>
  <div class="space-y-6">
    <!-- 公积金账户总览 -->
    <div v-if="housingFundInfo" class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <div>
          <p class="text-white/80 text-sm mb-1">公积金账户余额</p>
          <p class="text-4xl font-bold mb-2">¥{{ housingFundInfo.balance.toLocaleString() }}</p>
          <p class="text-white/90 text-sm">账户编号：{{ housingFundInfo.accountNumber }}</p>
        </div>
        <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div class="bg-white/20 rounded-lg p-3">
          <p class="text-white/80 text-xs mb-1">月缴存额</p>
          <p class="text-xl font-bold">¥{{ housingFundInfo.monthlyDeposit.toLocaleString() }}</p>
        </div>
        <div class="bg-white/20 rounded-lg p-3">
          <p class="text-white/80 text-xs mb-1">可贷额度</p>
          <p class="text-xl font-bold">¥{{ housingFundInfo.loanLimit.toLocaleString() }}</p>
        </div>
      </div>
    </div>

    <!-- 业务办理 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 公积金提取 -->
      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          公积金提取
        </h3>
        <button
          @click="showWithdrawalForm = true"
          class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          申请提取
        </button>
      </div>

      <!-- 公积金贷款 -->
      <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          公积金贷款
        </h3>
        <button
          @click="showLoanForm = true"
          class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          申请贷款
        </button>
      </div>
    </div>

    <!-- 提取申请表单 -->
    <div v-if="showWithdrawalForm" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">公积金提取申请</h3>
        <button @click="showWithdrawalForm = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">提取类型<span class="text-red-500">*</span></label>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label
            v-for="type in withdrawalTypes"
            :key="type.value"
            class="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            :class="withdrawalForm.type === type.value ? 'border-primary bg-primary/5' : 'border-gray-200'"
          >
            <input
              type="radio"
              v-model="withdrawalForm.type"
              :value="type.value"
              class="text-primary focus:ring-primary"
            >
            <div class="ml-3">
              <p class="font-medium text-gray-800">{{ type.label }}</p>
              <p class="text-xs text-gray-500">{{ type.description }}</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">提取金额（元）<span class="text-red-500">*</span></label>
        <div class="relative">
          <input
            type="number"
            v-model.number="withdrawalForm.amount"
            :max="housingFundInfo?.balance || 0"
            min="0"
            step="100"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="请输入提取金额"
          >
          <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
        </div>
        <p class="text-xs text-gray-500 mt-1">可提取余额：¥{{ (housingFundInfo?.balance || 0).toLocaleString() }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">收款账户<span class="text-red-500">*</span></label>
        <select
          v-model="withdrawalForm.receiveAccount"
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">请选择收款账户</option>
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
            <p class="font-medium mb-1">提取说明</p>
            <p>提取申请提交后，系统将自动校验您的提取资格。审核通过后，资金将在1-3个工作日内到账。</p>
          </div>
        </div>
      </div>

      <div class="flex gap-3">
        <button
          @click="showWithdrawalForm = false"
          class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          @click="submitWithdrawal"
          :disabled="!canSubmitWithdrawal"
          class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          提交申请
        </button>
      </div>
    </div>

    <!-- 贷款申请表单 -->
    <div v-if="showLoanForm" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-800">公积金贷款申请</h3>
        <button @click="showLoanForm = false" class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p class="text-sm text-blue-800">
          <span class="font-semibold">提示：</span>公积金贷款申请将使用您的公积金缴存数据作为收入和信用证明，申请流程与大额贷款相同。
        </p>
      </div>

      <div class="text-center py-8">
        <p class="text-gray-600 mb-4">公积金贷款申请将跳转至大额贷款申请流程</p>
        <button
          @click="goToLargeLoan"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          前往大额贷款申请
        </button>
      </div>
    </div>

    <!-- 提取记录 -->
    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">提取记录</h3>
      <div v-if="withdrawalHistory.length > 0" class="space-y-3">
        <div
          v-for="record in withdrawalHistory"
          :key="record.id"
          class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-gray-800">{{ record.type }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(record.applyDate) }}</p>
            </div>
            <div class="text-right">
              <p class="text-lg font-bold text-green-600">¥{{ record.amount.toLocaleString() }}</p>
              <p class="text-xs" :class="record.status === 'success' ? 'text-green-600' : record.status === 'pending' ? 'text-amber-600' : 'text-gray-500'">
                {{ record.status === 'success' ? '已到账' : record.status === 'pending' ? '处理中' : '失败' }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        暂无提取记录
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLoanStore } from '@/stores/loanStore'
import { useAccountStore } from '@/stores/accountStore'

// 定义emit
const emit = defineEmits(['switch-tab'])

const loanStore = useLoanStore()
const accountStore = useAccountStore()

// 公积金信息
const housingFundInfo = ref(null)

// 账户列表
const accounts = computed(() => accountStore.userInfo.accounts || [])

// 提取表单
const showWithdrawalForm = ref(false)
const withdrawalForm = ref({
  type: '',
  amount: 0,
  receiveAccount: ''
})

// 贷款表单
const showLoanForm = ref(false)

// 提取类型
const withdrawalTypes = [
  { value: 'rent', label: '租房提取', description: '用于支付房租' },
  { value: 'purchase', label: '购房提取', description: '用于购买住房' },
  { value: 'repayment', label: '还贷提取', description: '用于偿还房贷' },
  { value: 'retirement', label: '退休提取', description: '退休后一次性提取' }
]

// 提取记录
const withdrawalHistory = ref([])

// 是否可以提交提取
const canSubmitWithdrawal = computed(() => {
  return withdrawalForm.value.type &&
         withdrawalForm.value.amount > 0 &&
         withdrawalForm.value.amount <= (housingFundInfo.value?.balance || 0) &&
         withdrawalForm.value.receiveAccount
})

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 提交提取申请
const submitWithdrawal = async () => {
  try {
    await loanStore.applyHousingFundWithdrawal({
      type: withdrawalForm.value.type,
      amount: withdrawalForm.value.amount,
      receiveAccount: withdrawalForm.value.receiveAccount
    })
    
    window.$notify.success({
      title: '申请成功',
      message: '提取申请已提交，审核通过后1-3个工作日内到账',
      duration: 5000
    })
    
    showWithdrawalForm.value = false
    withdrawalForm.value = {
      type: '',
      amount: 0,
      receiveAccount: ''
    }
    
    // 刷新公积金信息
    await loanStore.fetchHousingFundInfo()
    housingFundInfo.value = loanStore.housingFundInfo
  } catch (error) {
    window.$notify.error({
      title: '申请失败',
      message: error.message || '提取申请失败，请稍后重试',
      duration: 5000
    })
  }
}

// 前往大额贷款
const goToLargeLoan = () => {
  // 触发父组件切换标签页
  emit('switch-tab', 'large-loan')
}

// 初始化
onMounted(async () => {
  try {
    await loanStore.fetchHousingFundInfo()
    housingFundInfo.value = loanStore.housingFundInfo
    await accountStore.fetchUserInfo()
    
    // 模拟提取记录
    withdrawalHistory.value = []
  } catch (error) {
    console.error('初始化失败:', error)
  }
})
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

