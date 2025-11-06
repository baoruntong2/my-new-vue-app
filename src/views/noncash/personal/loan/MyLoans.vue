<template>
  <div class="space-y-6">
    <!-- 贷款总览卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-blue-100 text-sm">总待还金额</span>
          <svg class="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold">¥{{ totalPendingAmount.toLocaleString() }}</p>
      </div>
      <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-green-100 text-sm">未结清贷款</span>
          <svg class="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <p class="text-3xl font-bold">{{ activeLoans.length }} 笔</p>
      </div>
      <div class="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-amber-100 text-sm">下一还款日</span>
          <svg class="w-6 h-6 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <p class="text-2xl font-bold">{{ nextRepaymentDateText }}</p>
      </div>
    </div>

    <!-- 贷款列表 -->
    <div v-if="activeLoans.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-800">我的贷款</h3>
      <div 
        v-for="loan in activeLoans" 
        :key="loan.id"
        class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center mb-2">
              <h4 class="text-lg font-semibold text-gray-800 mr-3">{{ loan.productName }}</h4>
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="getStatusClass(loan.status)"
              >
                {{ getStatusText(loan.status) }}
              </span>
            </div>
            <p class="text-sm text-gray-500">贷款编号：{{ loan.loanNumber }}</p>
          </div>
          <button
            @click="viewLoanDetail(loan.id)"
            class="text-primary hover:text-primary/80 text-sm font-medium"
          >
            查看详情
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">贷款金额</p>
            <p class="text-base font-semibold text-gray-800">¥{{ loan.amount.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">剩余本金</p>
            <p class="text-base font-semibold text-gray-800">¥{{ loan.remainingPrincipal.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">下一还款日</p>
            <p class="text-base font-semibold text-gray-800">{{ formatDate(loan.nextRepaymentDate) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">应还金额</p>
            <p class="text-base font-semibold text-primary">¥{{ loan.nextRepaymentAmount.toLocaleString() }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            @click="openRepayModal(loan)"
            class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            立即还款
          </button>
          <button
            @click="openScheduleModal(loan)"
            class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            预约还款
          </button>
          <button
            @click="viewRepaymentHistory(loan.id)"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            还款记录
          </button>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-12 bg-white rounded-xl border border-gray-200">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="text-gray-500 text-lg mb-2">暂无未结清贷款</p>
      <p class="text-gray-400 text-sm">您可以在上方选择贷款产品进行申请</p>
    </div>

    <!-- 还款弹窗 -->
    <div v-if="showRepayModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="closeRepayModal">
      <div class="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">还款</h3>
          <button @click="closeRepayModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="selectedLoan" class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">贷款产品</p>
            <p class="font-semibold text-gray-800">{{ selectedLoan.productName }}</p>
            <p class="text-sm text-gray-500 mt-2">剩余本金：¥{{ selectedLoan.remainingPrincipal.toLocaleString() }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">还款类型</label>
            <div class="space-y-2">
              <label class="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="repayType === 'partial' ? 'border-primary bg-primary/5' : 'border-gray-200'">
                <input type="radio" v-model="repayType" value="partial" class="text-primary focus:ring-primary">
                <div class="ml-3 flex-1">
                  <p class="font-medium text-gray-800">部分提前还款</p>
                  <p class="text-xs text-gray-500">提前偿还部分本金，减少后续利息</p>
                </div>
              </label>
              <label class="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                :class="repayType === 'full' ? 'border-primary bg-primary/5' : 'border-gray-200'">
                <input type="radio" v-model="repayType" value="full" class="text-primary focus:ring-primary">
                <div class="ml-3 flex-1">
                  <p class="font-medium text-gray-800">全部结清</p>
                  <p class="text-xs text-gray-500">一次性还清所有本金和利息</p>
                </div>
              </label>
            </div>
          </div>

          <div v-if="repayType === 'partial'">
            <label class="block text-sm font-medium text-gray-700 mb-2">还款金额（元）</label>
            <input
              type="number"
              v-model.number="repayAmount"
              :min="1000"
              :max="selectedLoan.remainingPrincipal"
              step="100"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入还款金额"
            >
            <p class="text-xs text-gray-500 mt-1">最低还款金额：¥1,000</p>
          </div>

          <div v-if="repayType === 'full'">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p class="text-sm text-blue-800 mb-2">预计结清金额</p>
              <p class="text-2xl font-bold text-blue-900">¥{{ calculateFullRepayAmount().toLocaleString() }}</p>
              <p class="text-xs text-blue-600 mt-1">包含本金、利息及可能的手续费</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">还款账户</label>
            <select
              v-model="repayAccount"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">请选择还款账户</option>
              <option v-for="account in accounts" :key="account.id" :value="account.id">
                {{ account.name }} ({{ account.number }})
              </option>
            </select>
          </div>

          <div class="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-sm text-amber-700">
                <p class="font-medium mb-1">温馨提示</p>
                <p>提前还款可能需要支付一定手续费，具体费用以实际计算为准。还款成功后，剩余本金和利息将重新计算。</p>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="closeRepayModal"
              class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              @click="confirmRepay"
              :disabled="!canConfirmRepay"
              class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确认还款
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 预约还款弹窗 -->
    <div v-if="showScheduleModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="closeScheduleModal">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">预约还款</h3>
          <button @click="closeScheduleModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="selectedLoan" class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <p class="text-sm text-gray-500 mb-1">贷款产品</p>
            <p class="font-semibold text-gray-800">{{ selectedLoan.productName }}</p>
            <p class="text-sm text-gray-500 mt-2">下一还款日：{{ formatDate(selectedLoan.nextRepaymentDate) }}</p>
            <p class="text-sm text-gray-500">应还金额：¥{{ selectedLoan.nextRepaymentAmount.toLocaleString() }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">预约还款日期</label>
            <input
              type="date"
              v-model="scheduleDate"
              :min="minScheduleDate"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
            <p class="text-xs text-gray-500 mt-1">请选择未来7-30天内的日期</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">还款账户</label>
            <select
              v-model="scheduleAccount"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
              <p class="text-sm text-blue-700">系统将在预约日期自动从指定账户扣款，请确保账户余额充足。</p>
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="closeScheduleModal"
              class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              @click="confirmSchedule"
              :disabled="!canConfirmSchedule"
              class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确认预约
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 还款记录弹窗 -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="closeHistoryModal">
      <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">还款记录</h3>
          <button @click="closeHistoryModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="repaymentHistory.length > 0" class="space-y-3">
          <div 
            v-for="record in repaymentHistory" 
            :key="record.id"
            class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center justify-between mb-2">
              <div>
                <p class="font-semibold text-gray-800">{{ formatDate(record.repayDate) }}</p>
                <p class="text-sm text-gray-500">{{ record.type === 'normal' ? '正常还款' : record.type === 'partial' ? '部分提前还款' : '全部结清' }}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-primary">¥{{ record.amount.toLocaleString() }}</p>
                <p class="text-xs text-gray-500" :class="record.status === 'success' ? 'text-green-600' : 'text-gray-500'">
                  {{ record.status === 'success' ? '还款成功' : record.status === 'pending' ? '处理中' : '失败' }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4 text-sm text-gray-600 pt-2 border-t border-gray-100">
              <div>
                <span class="text-gray-500">本金：</span>
                <span class="font-medium">¥{{ record.principal.toLocaleString() }}</span>
              </div>
              <div>
                <span class="text-gray-500">利息：</span>
                <span class="font-medium">¥{{ record.interest.toLocaleString() }}</span>
              </div>
              <div>
                <span class="text-gray-500">手续费：</span>
                <span class="font-medium">¥{{ (record.fee || 0).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          暂无还款记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLoanStore } from '@/stores/loanStore'
import { useAccountStore } from '@/stores/accountStore'

const loanStore = useLoanStore()
const accountStore = useAccountStore()

// 计算属性
const activeLoans = computed(() => loanStore.activeLoans)
const totalPendingAmount = computed(() => loanStore.totalPendingAmount)
const nextRepaymentDate = computed(() => loanStore.nextRepaymentDate)
const accounts = computed(() => accountStore.userInfo.accounts || [])

const nextRepaymentDateText = computed(() => {
  if (!nextRepaymentDate.value) return '暂无'
  return formatDate(nextRepaymentDate.value)
})

// 还款弹窗
const showRepayModal = ref(false)
const selectedLoan = ref(null)
const repayType = ref('partial')
const repayAmount = ref(0)
const repayAccount = ref('')

// 预约还款弹窗
const showScheduleModal = ref(false)
const scheduleDate = ref('')
const scheduleAccount = ref('')

// 还款记录弹窗
const showHistoryModal = ref(false)
const repaymentHistory = ref([])

// 最小预约日期（7天后）
const minScheduleDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
})

// 是否可以确认还款
const canConfirmRepay = computed(() => {
  if (!repayAccount.value) return false
  if (repayType.value === 'partial') {
    return repayAmount.value >= 1000 && repayAmount.value <= (selectedLoan.value?.remainingPrincipal || 0)
  }
  return true
})

// 是否可以确认预约
const canConfirmSchedule = computed(() => {
  return scheduleDate.value && scheduleAccount.value
})

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'pending': '审批中',
    'approved': '已放款',
    'active': '还款中',
    'overdue': '逾期',
    'closed': '已结清',
    'settled': '已结清'
  }
  return statusMap[status] || status
}

// 获取状态样式
const getStatusClass = (status) => {
  const classMap = {
    'pending': 'bg-amber-100 text-amber-800',
    'approved': 'bg-blue-100 text-blue-800',
    'active': 'bg-green-100 text-green-800',
    'overdue': 'bg-red-100 text-red-800',
    'closed': 'bg-gray-100 text-gray-800',
    'settled': 'bg-gray-100 text-gray-800'
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

// 计算全部结清金额
const calculateFullRepayAmount = () => {
  if (!selectedLoan.value) return 0
  // 简化计算：剩余本金 + 预计利息 + 手续费
  const principal = selectedLoan.value.remainingPrincipal || 0
  const interest = principal * 0.05 // 简化：假设5%的利息
  const fee = principal > 100000 ? principal * 0.001 : 0 // 大额提前还款手续费
  return Math.round(principal + interest + fee)
}

// 打开还款弹窗
const openRepayModal = (loan) => {
  selectedLoan.value = loan
  repayType.value = 'partial'
  repayAmount.value = Math.min(10000, loan.remainingPrincipal)
  repayAccount.value = accounts.value[0]?.id || ''
  showRepayModal.value = true
}

// 关闭还款弹窗
const closeRepayModal = () => {
  showRepayModal.value = false
  selectedLoan.value = null
  repayAmount.value = 0
  repayAccount.value = ''
}

// 确认还款
const confirmRepay = async () => {
  try {
    const amount = repayType.value === 'full' ? calculateFullRepayAmount() : repayAmount.value
    await loanStore.repayLoan(selectedLoan.value.id, {
      type: repayType.value,
      amount: amount,
      accountId: repayAccount.value
    })
    window.$notify.success({
      title: '还款成功',
      message: `已成功还款 ¥${amount.toLocaleString()}`,
      duration: 5000
    })
    closeRepayModal()
  } catch (error) {
    window.$notify.error({
      title: '还款失败',
      message: error.message || '还款操作失败，请稍后重试',
      duration: 5000
    })
  }
}

// 打开预约还款弹窗
const openScheduleModal = (loan) => {
  selectedLoan.value = loan
  scheduleDate.value = ''
  scheduleAccount.value = accounts.value[0]?.id || ''
  showScheduleModal.value = true
}

// 关闭预约还款弹窗
const closeScheduleModal = () => {
  showScheduleModal.value = false
  selectedLoan.value = null
  scheduleDate.value = ''
  scheduleAccount.value = ''
}

// 确认预约
const confirmSchedule = async () => {
  try {
    await loanStore.scheduleRepayment(selectedLoan.value.id, {
      date: scheduleDate.value,
      accountId: scheduleAccount.value,
      amount: selectedLoan.value.nextRepaymentAmount
    })
    window.$notify.success({
      title: '预约成功',
      message: `已成功预约 ${formatDate(scheduleDate.value)} 自动还款`,
      duration: 5000
    })
    closeScheduleModal()
  } catch (error) {
    window.$notify.error({
      title: '预约失败',
      message: error.message || '预约操作失败，请稍后重试',
      duration: 5000
    })
  }
}

// 查看还款记录
const viewRepaymentHistory = async (loanId) => {
  try {
    const history = await loanStore.fetchRepaymentHistory(loanId)
    repaymentHistory.value = history || []
    showHistoryModal.value = true
  } catch (error) {
    window.$notify.error({
      title: '获取失败',
      message: error.message || '获取还款记录失败',
      duration: 5000
    })
  }
}

// 关闭还款记录弹窗
const closeHistoryModal = () => {
  showHistoryModal.value = false
  repaymentHistory.value = []
}

// 查看贷款详情
const viewLoanDetail = (loanId) => {
  // 可以跳转到详情页或显示详情弹窗
  console.log('查看贷款详情:', loanId)
}

// 初始化
onMounted(async () => {
  try {
    await loanStore.fetchMyLoans()
    await accountStore.fetchUserInfo()
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

