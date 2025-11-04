<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useNonCashStore from '@/stores/nonCashStore'
import BaseButton from '@/components/common/BaseButton.vue'
const router = useRouter()
const nonCashStore = useNonCashStore()

onMounted(async () => {
  try {
    await nonCashStore.fetchAccounts()
  } catch (error) {
    console.error('Failed to fetch accounts:', error)
    nonCashStore.error = '加载账户数据失败，请刷新页面重试'
  }
})

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="container mx-auto py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">非现金业务</h2>
      <p class="text-gray-600">提供账户管理、支付结算、信贷服务等多元化金融服务</p>
      <div v-if="nonCashStore.error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
        {{ nonCashStore.error }}
        <BaseButton variant="text" size="small" class="ml-2" @click="nonCashStore.clearError">关闭</BaseButton>
      </div>
      <div v-if="nonCashStore.isLoading" class="mt-4 p-3 bg-blue-100 text-blue-700 rounded-md">
        正在加载账户信息...
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 账户基础服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">账户基础服务</h3>
          <p class="text-gray-600 mb-4">提供个人账户的开立、注销、挂失、密码重置、交易流水打印及个人信息变更服务。</p>
          <BaseButton
            @click="navigateTo('/noncash/account-services')"
            variant="primary"
            class="inline-flex items-center"
          >
            办理业务
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 支付结算服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">支付结算服务</h3>
          <p class="text-gray-600 mb-4">提供多种转账汇款方式，包括同城/异地转账、跨行转账、跨境汇款及生活缴费服务。</p>
          <BaseButton
            @click="navigateTo('/noncash/payment-services')"
            variant="secondary"
            class="inline-flex items-center"
          >
            转账汇款
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>

        </div>
      </div>

      <!-- 银行卡综合服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">银行卡综合服务</h3>
          <p class="text-gray-600 mb-4">包括信用卡申请、卡片激活、卡片更换、信用卡分期及信用额度调整服务。</p>
          <BaseButton
            @click="navigateTo('/noncash/card-services')"
            variant="success"
            class="inline-flex items-center"
          >
            卡片管理
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 个人信贷服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-info/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">个人信贷服务</h3>
          <p class="text-gray-600 mb-4">提供个人贷款办理，包括住房按揭贷款、汽车消费贷款、个人经营性贷款及信用消费贷款等。</p>
          <BaseButton
            @click="navigateTo('/noncash/loan-services')"
            variant="info"
            class="inline-flex items-center"
          >
            贷款申请
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>

      <!-- 投资理财服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">投资理财服务</h3>
          <p class="text-gray-600 mb-4">提供各类投资产品购买，包括开放式基金、银行理财产品、储蓄国债、实物黄金/纸黄金及外汇买卖。</p>
          <router-link
            to="/noncash/investment-services"
            class="text-warning font-medium hover:text-warning/80 inline-flex items-center"
          >
            投资产品
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- 签约管理服务 -->
      <div class="card hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">签约管理服务</h3>
          <p class="text-gray-600 mb-4">提供各类服务签约与解约，包括短信通知服务、手机银行、网上银行开通与关闭，以及第三方支付平台的绑定与解绑服务。</p>
          <BaseButton
            @click="navigateTo('/noncash/contract-services')"
            variant="danger"
            class="inline-flex items-center"
          >
            签约管理
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>