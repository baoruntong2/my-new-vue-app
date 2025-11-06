<template>
  <div class="space-y-6">
    <!-- 贷款类型选择 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div 
        class="p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md"
        :class="loanType === 'house' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
        @click="loanType = 'house'"
      >
        <div class="flex items-center mb-3">
          <input type="radio" v-model="loanType" value="house" class="text-primary focus:ring-primary">
          <h3 class="ml-3 text-lg font-semibold text-gray-800">住房按揭贷款</h3>
        </div>
        <p class="text-sm text-gray-600">购买商品房、二手房等住房贷款</p>
      </div>
      <div 
        class="p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md"
        :class="loanType === 'car' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
        @click="loanType = 'car'"
      >
        <div class="flex items-center mb-3">
          <input type="radio" v-model="loanType" value="car" class="text-primary focus:ring-primary">
          <h3 class="ml-3 text-lg font-semibold text-gray-800">汽车消费贷款</h3>
        </div>
        <p class="text-sm text-gray-600">购买新车、二手车等汽车贷款</p>
      </div>
    </div>

    <!-- 预申请表单 -->
    <div v-if="loanType" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">贷款预申请</h3>

      <!-- 贷款测算 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ loanType === 'house' ? '房产总价（元）' : '车辆价格（元）' }}<span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              type="number"
              v-model.number="formData.totalPrice"
              min="0"
              step="1000"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              :placeholder="loanType === 'house' ? '请输入房产总价' : '请输入车辆价格'"
            >
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">首付比例<span class="text-red-500">*</span></label>
          <div class="flex gap-2">
            <button
              v-for="ratio in downPaymentRatios"
              :key="ratio"
              @click="formData.downPaymentRatio = ratio"
              class="flex-1 px-4 py-2 border-2 rounded-lg transition-all"
              :class="formData.downPaymentRatio === ratio 
                ? 'border-primary bg-primary/5 text-primary font-medium' 
                : 'border-gray-200 hover:border-gray-300'"
            >
              {{ ratio }}%
            </button>
          </div>
        </div>
      </div>

      <!-- 自动计算结果 -->
      <div v-if="formData.totalPrice && formData.downPaymentRatio" class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <h4 class="font-semibold text-gray-800 mb-4">贷款测算结果</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p class="text-xs text-gray-500 mb-1">首付金额</p>
            <p class="text-lg font-bold text-gray-800">¥{{ downPaymentAmount.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">可贷金额</p>
            <p class="text-lg font-bold text-primary">¥{{ loanAmount.toLocaleString() }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">参考利率</p>
            <p class="text-lg font-bold text-gray-800">{{ referenceRate }}%</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">预计月供</p>
            <p class="text-lg font-bold text-gray-800">¥{{ estimatedMonthlyPayment.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <!-- 个人信息 -->
      <div class="border-t border-gray-200 pt-6">
        <h4 class="font-semibold text-gray-800 mb-4">个人信息</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">姓名<span class="text-red-500">*</span></label>
            <input
              type="text"
              v-model="formData.name"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入姓名"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">身份证号<span class="text-red-500">*</span></label>
            <input
              type="text"
              v-model="formData.idCard"
              maxlength="18"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入身份证号"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">手机号<span class="text-red-500">*</span></label>
            <input
              type="tel"
              v-model="formData.phone"
              maxlength="11"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入手机号"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">年龄<span class="text-red-500">*</span></label>
            <input
              type="number"
              v-model.number="formData.age"
              min="18"
              max="65"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入年龄"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">职业<span class="text-red-500">*</span></label>
            <select
              v-model="formData.occupation"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">请选择职业</option>
              <option value="employee">企业员工</option>
              <option value="civil-servant">公务员</option>
              <option value="teacher">教师</option>
              <option value="doctor">医生</option>
              <option value="self-employed">个体工商户</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">月收入（元）<span class="text-red-500">*</span></label>
            <input
              type="number"
              v-model.number="formData.monthlyIncome"
              min="0"
              step="100"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="请输入月收入"
            >
          </div>
        </div>
      </div>

      <!-- 授权查询征信 -->
      <div class="flex items-start">
        <input
          type="checkbox"
          id="authorizeCredit"
          v-model="formData.authorizeCredit"
          class="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        >
        <label for="authorizeCredit" class="ml-2 text-sm text-gray-700">
          我已授权银行查询我的征信记录用于贷款审批
        </label>
      </div>

      <!-- 提交预申请 -->
      <button
        @click="submitPreApplication"
        :disabled="!canSubmit"
        class="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        提交预申请
      </button>
    </div>

    <!-- 预审结果 -->
    <div v-if="preApprovalResult" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div v-if="preApprovalResult.status === 'approved'" class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h4 class="text-xl font-semibold text-gray-800 mb-2">预审通过</h4>
        <p class="text-gray-600 mb-6">恭喜！您的贷款预审已通过，请上传相关材料</p>
        <button
          @click="showDocumentUpload = true"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          上传材料
        </button>
      </div>
      <div v-else class="text-center">
        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h4 class="text-xl font-semibold text-gray-800 mb-2">建议补充材料</h4>
        <p class="text-gray-600 mb-4">{{ preApprovalResult.message }}</p>
        <ul class="text-left text-sm text-gray-600 mb-6 space-y-2">
          <li v-for="item in preApprovalResult.suggestions" :key="item" class="flex items-start">
            <span class="text-primary mr-2">•</span>
            <span>{{ item }}</span>
          </li>
        </ul>
        <button
          @click="showDocumentUpload = true"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          上传补充材料
        </button>
      </div>
    </div>

    <!-- 材料上传 -->
    <div v-if="showDocumentUpload" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-semibold text-gray-800 mb-4">材料上传</h4>
      <div class="space-y-4">
        <div v-for="doc in documentList" :key="doc.type" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <div>
              <p class="font-medium text-gray-800">{{ doc.name }}</p>
              <p class="text-xs text-gray-500">{{ doc.description }}</p>
            </div>
            <span v-if="doc.required" class="text-xs text-red-500">必填</span>
          </div>
          <div class="mt-3">
            <input
              type="file"
              :id="`file-${doc.type}`"
              @change="handleFileUpload($event, doc.type)"
              accept="image/*,.pdf"
              class="hidden"
            >
            <label
              :for="`file-${doc.type}`"
              class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              选择文件
            </label>
            <span v-if="uploadedFiles[doc.type]" class="ml-3 text-sm text-green-600">
              ✓ {{ uploadedFiles[doc.type].name }}
            </span>
          </div>
        </div>
        <div class="flex gap-3 pt-4">
          <button
            @click="showDocumentUpload = false"
            class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            @click="submitDocuments"
            :disabled="!canSubmitDocuments"
            class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            提交材料
          </button>
        </div>
      </div>
    </div>

    <!-- 客户经理选择 -->
    <div v-if="showManagerSelection" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-semibold text-gray-800 mb-4">选择客户经理</h4>
      <div class="space-y-4">
        <div
          v-for="manager in managers"
          :key="manager.id"
          class="border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
          :class="selectedManager?.id === manager.id ? 'border-primary bg-primary/5' : 'border-gray-200'"
          @click="selectedManager = manager"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <h5 class="font-semibold text-gray-800 mr-3">{{ manager.name }}</h5>
                <div class="flex items-center text-yellow-500">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="ml-1 text-sm">{{ manager.rating }}</span>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-1">{{ manager.branch }}</p>
              <p class="text-sm text-gray-500">{{ manager.address }}</p>
              <p class="text-sm text-gray-500 mt-1">距离您约 {{ manager.distance }}km</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span v-for="spec in manager.specialty" :key="spec" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {{ spec }}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <input
                type="radio"
                :checked="selectedManager?.id === manager.id"
                class="text-primary focus:ring-primary"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex gap-3">
        <button
          @click="showManagerSelection = false"
          class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          @click="confirmManager"
          :disabled="!selectedManager"
          class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          确认选择
        </button>
      </div>
    </div>

    <!-- 预约面签 -->
    <div v-if="showAppointment" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-semibold text-gray-800 mb-4">预约面签</h4>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">选择网点</label>
          <select
            v-model="appointmentData.branchId"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">请选择网点</option>
            <option v-for="manager in managers" :key="manager.id" :value="manager.id">
              {{ manager.branch }} - {{ manager.address }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">选择日期</label>
          <input
            type="date"
            v-model="appointmentData.date"
            :min="minAppointmentDate"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">选择时间</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="time in timeSlots"
              :key="time"
              @click="appointmentData.time = time"
              class="px-3 py-2 border-2 rounded-lg transition-all text-sm"
              :class="appointmentData.time === time 
                ? 'border-primary bg-primary/5 text-primary font-medium' 
                : 'border-gray-200 hover:border-gray-300'"
            >
              {{ time }}
            </button>
          </div>
        </div>
        <div class="flex gap-3 pt-4">
          <button
            @click="showAppointment = false"
            class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            @click="confirmAppointment"
            :disabled="!canConfirmAppointment"
            class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            确认预约
          </button>
        </div>
      </div>
    </div>

    <!-- 进度跟踪 -->
    <div v-if="loanApplicationId" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 class="text-lg font-semibold text-gray-800 mb-4">贷款进度</h4>
      <div class="space-y-4">
        <div
          v-for="(step, index) in progressSteps"
          :key="step.status"
          class="flex items-start"
        >
          <div class="flex flex-col items-center mr-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
              :class="step.completed ? 'bg-primary text-white' : step.current ? 'bg-primary/20 text-primary border-2 border-primary' : 'bg-gray-200 text-gray-500'">
              {{ step.completed ? '✓' : index + 1 }}
            </div>
            <div v-if="index < progressSteps.length - 1" class="w-0.5 h-12 mt-2"
              :class="step.completed ? 'bg-primary' : 'bg-gray-200'"></div>
          </div>
          <div class="flex-1">
            <p class="font-medium text-gray-800">{{ step.title }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ step.description }}</p>
            <p v-if="step.date" class="text-xs text-gray-400 mt-1">{{ step.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useLoanStore } from '@/stores/loanStore'

const loanStore = useLoanStore()

// 贷款类型
const loanType = ref('')

// 首付比例选项
const downPaymentRatios = loanType.value === 'house' ? [20, 30, 40, 50] : [20, 30, 40]

// 表单数据
const formData = ref({
  totalPrice: 0,
  downPaymentRatio: loanType.value === 'house' ? 30 : 30,
  name: '张三',
  idCard: '',
  phone: '13800138000',
  age: 30,
  occupation: '',
  monthlyIncome: 0,
  authorizeCredit: false
})

// 预审结果
const preApprovalResult = ref(null)

// 材料上传
const showDocumentUpload = ref(false)
const uploadedFiles = ref({})
const documentList = computed(() => {
  if (loanType.value === 'house') {
    return [
      { type: 'idCard', name: '身份证', description: '正反面', required: true },
      { type: 'incomeProof', name: '收入证明', description: '近6个月银行流水或工资单', required: true },
      { type: 'socialSecurity', name: '社保记录', description: '近12个月社保缴费记录', required: false },
      { type: 'houseContract', name: '购房合同', description: '商品房买卖合同或认购书', required: true }
    ]
  } else {
    return [
      { type: 'idCard', name: '身份证', description: '正反面', required: true },
      { type: 'incomeProof', name: '收入证明', description: '近6个月银行流水或工资单', required: true },
      { type: 'carContract', name: '购车合同', description: '车辆认购书或购车协议', required: true }
    ]
  }
})

// 客户经理
const managers = ref([])
const showManagerSelection = ref(false)
const selectedManager = ref(null)

// 预约面签
const showAppointment = ref(false)
const appointmentData = ref({
  branchId: '',
  date: '',
  time: ''
})
const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']

// 贷款申请ID
const loanApplicationId = ref(null)
const progressSteps = ref([])

// 计算属性
const downPaymentAmount = computed(() => {
  if (!formData.value.totalPrice || !formData.value.downPaymentRatio) return 0
  return Math.round(formData.value.totalPrice * formData.value.downPaymentRatio / 100)
})

const loanAmount = computed(() => {
  return formData.value.totalPrice - downPaymentAmount.value
})

const referenceRate = computed(() => {
  return loanType.value === 'house' ? 4.35 : 5.5
})

const estimatedMonthlyPayment = computed(() => {
  if (!loanAmount.value) return 0
  const rate = referenceRate.value / 100 / 12
  const months = 30 * 12 // 假设30年
  const temp = Math.pow(1 + rate, months)
  return Math.round((loanAmount.value * rate * temp) / (temp - 1))
})

const minAppointmentDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().split('T')[0]
})

const canSubmit = computed(() => {
  return formData.value.totalPrice > 0 &&
         formData.value.downPaymentRatio &&
         formData.value.name &&
         formData.value.idCard &&
         formData.value.phone &&
         formData.value.age >= 18 &&
         formData.value.occupation &&
         formData.value.monthlyIncome > 0 &&
         formData.value.authorizeCredit
})

const canSubmitDocuments = computed(() => {
  const requiredDocs = documentList.value.filter(doc => doc.required)
  return requiredDocs.every(doc => uploadedFiles.value[doc.type])
})

const canConfirmAppointment = computed(() => {
  return appointmentData.value.branchId &&
         appointmentData.value.date &&
         appointmentData.value.time
})

// 提交预申请
const submitPreApplication = async () => {
  try {
    const result = await loanStore.applyLargeLoan({
      type: loanType.value,
      ...formData.value,
      loanAmount: loanAmount.value
    })
    
    preApprovalResult.value = result
    if (result.status === 'approved') {
      showDocumentUpload.value = true
      await fetchManagers()
    }
  } catch (error) {
    window.$notify.error({
      title: '预审失败',
      message: error.message || '预审申请失败，请稍后重试',
      duration: 5000
    })
  }
}

// 处理文件上传
const handleFileUpload = (event, docType) => {
  const file = event.target.files[0]
  if (file) {
    uploadedFiles.value[docType] = file
  }
}

// 提交材料
const submitDocuments = async () => {
  try {
    if (!loanApplicationId.value) {
      loanApplicationId.value = `LOAN${Date.now()}`
    }
    
    const documents = Object.entries(uploadedFiles.value).map(([type, file]) => ({
      type,
      file
    }))
    
    await loanStore.uploadLoanDocuments(loanApplicationId.value, documents)
    
    window.$notify.success({
      title: '提交成功',
      message: '材料已提交，客户经理将在24小时内进行初审',
      duration: 5000
    })
    
    showDocumentUpload.value = false
    showManagerSelection.value = true
    await fetchLoanProgress()
  } catch (error) {
    window.$notify.error({
      title: '提交失败',
      message: error.message || '材料提交失败，请稍后重试',
      duration: 5000
    })
  }
}

// 获取客户经理列表
const fetchManagers = async () => {
  try {
    const result = await loanStore.fetchManagers({
      type: loanType.value,
      city: '北京'
    })
    managers.value = result
  } catch (error) {
    console.error('获取客户经理列表失败:', error)
  }
}

// 确认选择客户经理
const confirmManager = () => {
  showManagerSelection.value = false
  showAppointment.value = true
}

// 确认预约
const confirmAppointment = async () => {
  try {
    await loanStore.bookAppointment({
      loanId: loanApplicationId.value,
      managerId: selectedManager.value.id,
      ...appointmentData.value
    })
    
    window.$notify.success({
      title: '预约成功',
      message: `已成功预约 ${appointmentData.value.date} ${appointmentData.value.time} 面签`,
      duration: 5000
    })
    
    showAppointment.value = false
    await fetchLoanProgress()
  } catch (error) {
    window.$notify.error({
      title: '预约失败',
      message: error.message || '预约失败，请稍后重试',
      duration: 5000
    })
  }
}

// 获取贷款进度
const fetchLoanProgress = async () => {
  if (!loanApplicationId.value) return
  try {
    const progress = await loanStore.fetchLoanProgress(loanApplicationId.value)
    progressSteps.value = progress.steps || [
      { status: 'submitted', title: '材料已提交', description: '等待客户经理初审', completed: true, current: false, date: new Date().toISOString() },
      { status: 'reviewing', title: '审批中', description: '银行正在审核您的申请', completed: false, current: true },
      { status: 'approved', title: '审批通过', description: '等待放款', completed: false, current: false },
      { status: 'disbursed', title: '已放款', description: '资金已划拨至指定账户', completed: false, current: false }
    ]
  } catch (error) {
    console.error('获取贷款进度失败:', error)
  }
}

// 监听贷款类型变化
watch(loanType, (newType) => {
  if (newType) {
    formData.value.downPaymentRatio = newType === 'house' ? 30 : 30
  }
}, { immediate: false })

onMounted(() => {
  // 初始化
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

