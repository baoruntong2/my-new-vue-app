<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useCashStore from '@/stores/cashStore'
import { useAppointmentStore } from '@/stores/appointmentStore';

const cashStore = useCashStore()
const router = useRouter()
const appointmentStore = useAppointmentStore();
const isLoading = ref(false);
import BaseButton from '@/components/common/BaseButton.vue'

const navigateTo = (path) => {
  router.push(path)
}

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

onMounted(() => {
  cashStore.fetchExchangeRates()
})
</script>

<template>
  <div class="container mx-auto py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">现金业务</h2>
      <p class="text-gray-600">提供现金存取款、兑换等相关服务</p>
      <div v-if="cashStore && cashStore.isLoading" class="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
        正在加载汇率数据...
      </div>
      <div v-if="cashStore && cashStore.error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
        {{ cashStore.error }}
        <BaseButton variant="text" size="small" class="ml-2" @click="cashStore.clearError">关闭</BaseButton>
      </div>
    </div>

    <div class="mb-6" v-if="cashStore && !cashStore.isLoading && Object.keys(cashStore.exchangeRates).length">
      <h3 class="text-lg font-semibold mb-2">实时汇率</h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div class="p-2 bg-gray-50 rounded-md" v-for="(rate, currency) in cashStore.exchangeRates" :key="currency">
          <p class="text-sm font-medium">{{ currency }}/{{ cashStore.currentCurrency }}</p>
          <p class="text-lg font-bold">{{ rate.toFixed(4) }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 现金存取款服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">现金存取款服务</h3>
          <p class="text-gray-600 mb-4">为个人及公司账户提供现金存入和提取功能，支持人民币及外币业务办理。</p>
          <BaseButton variant="primary" class="inline-flex items-center" @click="navigateTo('/cash/deposit-withdrawal')">
            在线预约
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 零钱及残币兑换 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">零钱及残币兑换</h3>
          <p class="text-gray-600 mb-4">为客户提供零钱兑换整钞、残损纸币更换服务，需按银行残币兑换标准执行。</p>
          <BaseButton variant="secondary" class="inline-flex items-center" @click="handleServiceClick('change')">
            了解详情
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 新钞兑换服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">新钞兑换服务</h3>
          <p class="text-gray-600 mb-4">在节假日等特殊时期，为客户提供新钞兑换服务，满足红包发放等特殊需求。</p>
          <BaseButton variant="success" class="inline-flex items-center" @click="handleServiceClick('new-notes')">
            查看活动
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 外币兑换服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">外币兑换服务</h3>
          <p class="text-gray-600 mb-4">通过银行柜台提供主要国际货币的买入和卖出服务，汇率按当日银行挂牌汇率执行。</p>
          <BaseButton variant="info" class="inline-flex items-center" @click="navigateTo('/cash/currency-exchange')">
            查看汇率
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 假币鉴定服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">假币鉴定服务</h3>
          <p class="text-gray-600 mb-4">为客户提供疑似假币的专业鉴定预约服务。</p>
          <BaseButton variant="warning" class="inline-flex items-center" @click="navigateTo('/cash/counterfeit-detection')">
            预约鉴定
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>