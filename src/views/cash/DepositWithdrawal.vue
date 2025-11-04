<template>
  <div class="container mx-auto py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">存取款服务</h2>
      <p class="text-gray-600">为个人及公司账户提供现金存入和提取功能，支持人民币及外币业务办理</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 存款服务 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          存款服务
        </h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>人民币/外币现金存款，支持零钞及大额存款业务</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>公司账户对公存款，支持支票、汇票等多种存款方式</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>存款证明开具，满足签证、留学等特殊需求</span>
          </li>
        </ul>
        <div class="mt-6">
          <button class="btn-primary w-full" @click="handleServiceClick('deposit')">
            办理存款业务
          </button>
        </div>
      </div>

      <!-- 取款服务 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          取款服务
        </h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>人民币/外币现金取款，支持大额预约取款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>公司账户对公取款，支持支票、汇票等多种取款方式</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>紧急取款服务，满足客户特殊情况下的资金需求</span>
          </li>
        </ul>
        <div class="mt-6">
          <button class="btn-secondary w-full" @click="handleServiceClick('withdrawal')">
            办理取款业务
          </button>
        </div>
      </div>
    </div>

    <!-- 服务须知 -->
    <div class="bg-blue-50 p-6 rounded-lg border border-blue-100">
      <h3 class="text-lg font-semibold mb-3 text-blue-800">服务须知</h3>
      <ul class="space-y-2 text-blue-700 text-sm">
        <li class="flex items-start">
          <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>大额取款（超过5万元人民币或等值外币）需提前一天预约</span>
        </li>
        <li class="flex items-start">
          <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>外币存取款业务需提供有效身份证件，并遵守国家外汇管理规定</span>
        </li>
        <li class="flex items-start">
          <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>残损纸币兑换需按《中国人民银行残缺污损人民币兑换办法》执行</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { ref } from 'vue';

const router = useRouter();
const appointmentStore = useAppointmentStore();
const isLoading = ref(false);

// 处理服务选择事件
const handleServiceClick = async (serviceType) => {
  try {
    isLoading.value = true;
    // 激活预约程序
    appointmentStore.activateAppointment();
    // 存储选择的服务类型
    appointmentStore.setServiceType(serviceType);
    // 跳转到预约页面
    await router.push('/cash/appointment');
  } catch (error) {
    console.error('服务激活失败:', error);
    alert('服务暂时无法使用，请稍后重试');
  } finally {
    isLoading.value = false;
  }
};
</script>