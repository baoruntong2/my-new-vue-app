<template>
  <div class="container mx-auto py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">账户基础服务</h2>
      <p class="text-gray-600">提供个人账户的开立、注销、挂失、密码重置、交易流水打印及个人信息变更服务</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <!-- 账户开立 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          账户开立
        </h3>
        <ul class="space-y-2 text-gray-700 mb-4">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>个人储蓄账户、结算账户开立</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>账户类型选择及功能介绍</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>开户所需证件及流程说明</span>
          </li>
        </ul>
        <button class="btn-primary w-full">
          申请开户
        </button>
      </div>

      <!-- 账户注销 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          账户注销
        </h3>
        <ul class="space-y-2 text-gray-700 mb-4">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>个人账户注销条件及流程</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>账户余额清零及费用结算</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>注销后账户信息查询说明</span>
          </li>
        </ul>
        <button class="btn-secondary w-full">
          申请注销
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 账户挂失 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.586a2 2 0 001.414-.586l3.586-3.586a2 2 0 000-2.828l-3.586-3.586a2 2 0 00-2.828 0L11 7.586V4a2 2 0 00-4 0v3.586L5.05 9.05a2 2 0 000 2.828l3.586 3.586a2 2 0 002.828 0L12 12.414V16z"></path>
          </svg>
          账户挂失
        </h3>
        <div class="space-y-4 mb-4">
          <div>
            <h4 class="font-medium text-sm mb-1">临时挂失</h4>
            <p class="text-sm text-gray-600">紧急挂失，有效期为5天，可通过手机银行、网上银行或客服热线办理</p>
          </div>
          <div>
            <h4 class="font-medium text-sm mb-1">正式挂失</h4>
            <p class="text-sm text-gray-600">需携带有效身份证件到柜台办理，7天后可办理解挂或补卡手续</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button class="btn-primary">临时挂失</button>
          <button class="btn-secondary">正式挂失</button>
        </div>
      </div>

      <!-- 密码重置 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          密码重置
        </h3>
        <div class="space-y-4 mb-4">
          <div>
            <h4 class="font-medium text-sm mb-1">登录密码重置</h4>
            <p class="text-sm text-gray-600">通过手机验证码或邮箱验证重置网上银行、手机银行登录密码</p>
          </div>
          <div>
            <h4 class="font-medium text-sm mb-1">交易密码重置</h4>
            <p class="text-sm text-gray-600">需携带有效身份证件到柜台办理，用于转账、支付等交易验证</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <button class="btn-primary">登录密码重置</button>
          <button class="btn-secondary">交易密码重置</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 账户基础服务组件逻辑
</script>