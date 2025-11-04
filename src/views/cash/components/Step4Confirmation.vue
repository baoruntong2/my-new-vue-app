<template>
  <div class="confirmation-container space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">确认预约信息</h2>
      <p class="mt-2 text-sm text-gray-500">请确认以下预约信息，无误后提交</p>
    </div>

    <!-- 预约信息卡片 -->
    <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-5 py-3 border-b">
        <h3 class="font-medium text-gray-800">预约详情</h3>
      </div>
      <div class="p-5 space-y-4">
        <!-- 用户信息 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">姓名</p>
            <p class="font-medium">{{ userInfo.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">身份证号</p>
            <p class="font-medium">{{ maskIdCard(userInfo.idCard) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">联系电话</p>
            <p class="font-medium">{{ maskPhone(userInfo.phone) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">预约编号</p>
            <p class="font-medium text-primary">{{ appointmentNo }}</p>
          </div>
        </div>

        <!-- 业务信息 -->
        <div class="pt-4 border-t">
          <p class="text-sm text-gray-500 mb-2">业务信息</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">业务类型</p>
              <p class="font-medium">{{ businessTypeName }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">金额</p>
              <p class="font-medium">{{ formatCurrency(businessInfo.details.amount) }} 元</p>
            </div>
          </div>

          <!-- 额外业务详情 -->
          <div v-if="showDenominationDetails" class="mt-4 p-3 bg-gray-50 rounded-md">
            <p class="text-sm font-medium text-gray-700 mb-2">面额详情</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
              <div v-for="(count, denom) in validDenominations" :key="denom">
                <span class="text-gray-500">{{ denom }}元:</span>
                <span class="font-medium ml-1">{{ count }} {{ denom >= 1 ? '张' : '个' }}</span>
              </div>
              <div v-if="businessInfo.details.coins > 0">
                <span class="text-gray-500">硬币:</span>
                <span class="font-medium ml-1">{{ businessInfo.details.coins }} 元</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 预约时间和网点 -->
        <div class="pt-4 border-t">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">预约日期</p>
              <p class="font-medium">{{ formatDate(appointmentDate) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">预约时段</p>
              <p class="font-medium">{{ appointmentTime }}</p>
            </div>
            <div class="md:col-span-2">
              <p class="text-sm text-gray-500">预约网点</p>
              <p class="font-medium">{{ branchInfo.name }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ branchInfo.address }} | 电话: {{ branchInfo.phone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 注意事项 -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 class="text-sm font-medium text-blue-800 flex items-center">
        <svg class="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        注意事项
      </h3>
      <ul class="mt-2 text-sm text-blue-700 space-y-1">
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>请携带本人有效身份证件及银行卡前往办理</span>
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>如需取消预约，请提前2小时操作</span>
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>大额取款（超过5万元）请确保已提前一天预约</span>
        </li>
      </ul>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <button
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="emit('back')"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        返回修改
      </button>
      <button
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        @click="handleConfirm"
        :disabled="isSubmitting"
      >
        <span v-if="isSubmitting">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          提交中...
        </span>
        <span v-else>确认提交</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { formatDate, formatCurrency, maskIdCard, maskPhone } from '@/utils/formatters';
import { submitAppointment } from '@/api/appointment';

const appointmentStore = useAppointmentStore();
const emit = defineEmits(['confirmed', 'back']);
const isSubmitting = ref(false);

// 生成预约编号
const appointmentNo = computed(() => {
  const date = new Date();
  const prefix = 'XJ';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${year}${month}${day}${random}`;
});

// 从store获取数据
const userInfo = computed(() => appointmentStore.userInfo);
const businessInfo = computed(() => appointmentStore.businessInfo);
const branchInfo = computed(() => appointmentStore.branchInfo);
const appointmentDate = computed(() => appointmentStore.appointmentDate);
const appointmentTime = computed(() => appointmentStore.appointmentTime);
const businessTypeName = computed(() => appointmentStore.businessTypeName);

// 判断是否显示面额详情
const showDenominationDetails = computed(() => {
  const details = businessInfo.value.details || {};
  const denominations = details.denominations || {};
  // 检查是否有面额信息
  return Object.values(denominations).some(count => count > 0) || (details.coins || 0) > 0;
});

// 过滤有效的面额数据
const validDenominations = computed(() => {
  const details = businessInfo.value.details || {};
  const denominations = details.denominations || {};
  const result = {};
  // 只保留count > 0的面额
  Object.entries(denominations).forEach(([denom, count]) => {
    if (count > 0) {
      result[denom] = count;
    }
  });
  return result;
});

// 处理确认提交
const handleConfirm = async () => {
  try {
    isSubmitting.value = true;

    // 准备提交数据
    const appointmentData = {
      appointmentNo: appointmentNo.value,
      userId: userInfo.value.customerId || 'visitor',
      userName: userInfo.value.name,
      idCard: userInfo.value.idCard,
      phone: userInfo.value.phone,
      businessType: businessInfo.value.type,
      businessTypeName: businessTypeName.value,
      amount: businessInfo.value.details.amount,
      denominations: businessInfo.value.details.denominations,
      coins: businessInfo.value.details.coins,
      branchId: branchInfo.value.id,
      branchName: branchInfo.value.name,
      appointmentDate: appointmentDate.value,
      appointmentTime: appointmentTime.value,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // 提交预约
    const result = await submitAppointment(appointmentData);
    if (result.success) {
      // 保存预约编号
      appointmentStore.setAppointmentNo(appointmentNo.value);
      
      // 发送预约成功通知（模拟）
      setTimeout(() => {
        window.$notify?.success('预约成功，已发送短信通知');
      }, 500);
      
      emit('confirmed', appointmentNo.value);
    } else {
      throw new Error(result.message || '预约提交失败，请重试');
    }
  } catch (error) {
    console.error('预约提交失败:', error);
    window.$notify?.error(error.message || '预约提交失败，请稍后重试');
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.confirmation-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>

