<template>
  <div class="container mx-auto py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">个人信贷服务</h2>
      <p class="text-gray-600">提供个人贷款办理、公积金业务及贷款还款服务</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- 个人贷款办理 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          个人贷款办理
        </h3>
        <ul class="space-y-3 mb-6">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>住房按揭贷款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>汽车消费贷款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>个人经营性贷款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>信用消费贷款</span>
          </li>
        </ul>
        <button class="btn-primary w-full">
          查看贷款产品
        </button>
      </div>

      <!-- 公积金服务 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          公积金服务
        </h3>
        <ul class="space-y-3 mb-6">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>公积金缴存查询</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>公积金提取办理</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>公积金贷款申请</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>贷款额度测算</span>
          </li>
        </ul>
        <button class="btn-secondary w-full">
          公积金业务办理
        </button>
      </div>

      <!-- 贷款还款 -->
      <div class="card p-6 hover:shadow-md transition-shadow">
        <h3 class="text-xl font-semibold mb-4 flex items-center">
          <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
          </svg>
          贷款还款
        </h3>
        <ul class="space-y-3 mb-6">
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>等额本息还款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>等额本金还款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>提前还款</span>
          </li>
          <li class="flex items-start">
            <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>还款计划查询</span>
          </li>
        </ul>
        <button class="btn-primary w-full">
          办理还款
        </button>
      </div>
    </div>

    <!-- 贷款计算器 -->
    <div class="card p-6">
      <h3 class="text-xl font-semibold mb-4">贷款计算器</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">贷款金额 (元)</label>
            <input type="number" class="form-input w-full" placeholder="请输入贷款金额" value="500000">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">贷款期限 (年)</label>
            <select class="form-select w-full">
              <option value="5">5年</option>
              <option value="10">10年</option>
              <option value="20" selected>20年</option>
              <option value="30">30年</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">贷款利率 (%)</label>
            <input type="number" step="0.01" class="form-input w-full" placeholder="请输入年利率" value="4.90">
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">还款方式</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input type="radio" name="repaymentType" value="equalPrincipalInterest" class="form-radio text-primary" checked>
                <span class="ml-2">等额本息</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" name="repaymentType" value="equalPrincipal" class="form-radio text-primary">
                <span class="ml-2">等额本金</span>
              </label>
            </div>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-sm mb-2">计算结果</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">月还款额</span>
                <span class="font-semibold">3,272.22元</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">总支付利息</span>
                <span class="font-semibold text-red-600">285,332.86元</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">还款总额</span>
                <span class="font-semibold">785,332.86元</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-end">
          <button class="btn-primary w-full mb-3">
            计算还款计划
          </button>
          <button class="btn-secondary w-full">
            下载还款明细
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 个人信贷服务组件逻辑
</script>