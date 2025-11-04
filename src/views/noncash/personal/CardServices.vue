<template>
  <div class="container mx-auto py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">银行卡综合服务</h2>
      <p class="text-gray-600">提供信用卡申请、卡片激活、更换、分期及额度调整等服务</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 信用卡申请 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
          </svg>
          信用卡申请
        </h3>
        <div class="space-y-4 mb-4">
          <div class="flex items-start">
            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span class="font-bold text-blue-600">普卡</span>
            </div>
            <div>
              <h4 class="font-medium">标准信用卡</h4>
              <p class="text-sm text-gray-600">信用额度：1,000-10,000元，年费减免政策</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex-shrink-0 w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mr-3">
              <span class="font-bold text-gold-600">金卡</span>
            </div>
            <div>
              <h4 class="font-medium">金卡信用卡</h4>
              <p class="text-sm text-gray-600">信用额度：10,000-50,000元，机场贵宾厅礼遇</p>
            </div>
          </div>
          <div class="flex items-start">
            <div class="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <span class="font-bold text-gray-600">白金</span>
            </div>
            <div>
              <h4 class="font-medium">白金信用卡</h4>
              <p class="text-sm text-gray-600">信用额度：50,000-200,000元，专属客户经理服务</p>
            </div>
          </div>
        </div>
        <button class="btn-primary w-full">
          立即申请
        </button>
      </div>

      <!-- 卡片激活与更换 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4">卡片服务</h3>
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="font-medium text-sm">卡片激活</h4>
            <p class="text-xs text-gray-500 mt-1">新卡/补换卡</p>
          </div>
          <div class="border border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
              </svg>
            </div>
            <h4 class="font-medium text-sm">卡片更换</h4>
            <p class="text-xs text-gray-500 mt-1">损坏/到期/升级</p>
          </div>
        </div>
        <button class="btn-secondary w-full">
          办理卡片服务
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 信用卡分期 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          信用卡分期
        </h3>
        <div class="space-y-3 mb-4">
          <div class="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 class="font-medium text-sm">账单分期</h4>
              <p class="text-xs text-gray-500">将已出账单金额分期偿还</p>
            </div>
            <span class="text-xs font-medium text-purple-600">利率低至0.75%</span>
          </div>
          <div class="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
            <div>
              <h4 class="font-medium text-sm">消费分期</h4>
              <p class="text-xs text-gray-500">单笔消费满1000元可分期</p>
            </div>
            <span class="text-xs font-medium text-purple-600">3期免息优惠</span>
          </div>
        </div>
        <button class="btn-primary w-full">
          申请分期
        </button>
      </div>

      <!-- 信用额度调整 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8m8-8l-8-8"></path>
          </svg>
          信用额度调整
        </h3>
        <div class="space-y-4 mb-4">
          <div>
            <h4 class="font-medium text-sm mb-2">当前信用额度</h4>
            <div class="flex items-center">
              <span class="text-2xl font-bold text-gray-800">50,000</span>
              <span class="text-gray-500 ml-2">元</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <button class="btn-primary py-2">
              临时调额
            </button>
            <button class="btn-secondary py-2">
              永久调额
            </button>
          </div>
        </div>
        <div class="text-xs text-gray-500">
          <p>临时额度有效期通常为30-60天，永久调额需进行综合评估</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 银行卡综合服务组件逻辑
</script>