<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">填写业务信息</h2>
      <p class="mt-2 text-sm text-gray-500">请根据当前办理的业务填写详细信息</p>
    </div>

    <!-- 动态业务表单 -->
    <div v-if="selectedBusiness" class="border rounded-lg p-5 space-y-5 animate-fadeIn">
      <!-- 存款业务表单 -->
      <div v-if="selectedBusiness === 'deposit'">
        <h3 class="text-sm font-medium text-gray-700 mb-2">存款业务详情</h3>
<div class="text-xs text-gray-500 mb-4">
  办理步骤: {{ currentTypeConfig.steps && Array.isArray(currentTypeConfig.steps) ? currentTypeConfig.steps.join(' → ') : '-' }}
</div>
        <div class="space-y-4">
          <div>
            <label for="depositAmount" class="block text-sm font-medium text-gray-700 mb-1">预计存款总额（元）</label>
            <input
              type="number"
              id="depositAmount"
              v-model.number="formData.amount"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="请输入预计存款金额"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">主要面额构成（估算，可选填）</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label for="denomination100" class="block text-xs text-gray-500 mb-1">100元</label>
                <div class="flex">
                  <input
                    type="number"
                    id="denomination100"
                    v-model.number="formData.denominations['100']"
                    min="0"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    placeholder="张"
                  >
                </div>
              </div>
              <div>
                <label for="denomination50" class="block text-xs text-gray-500 mb-1">50元</label>
                <input
                  type="number"
                  id="denomination50"
                  v-model.number="formData.denominations['50']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="denomination20" class="block text-xs text-gray-500 mb-1">20元</label>
                <input
                  type="number"
                  id="denomination20"
                  v-model.number="formData.denominations['20']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="denomination10" class="block text-xs text-gray-500 mb-1">10元</label>
                <input
                  type="number"
                  id="denomination10"
                  v-model.number="formData.denominations['10']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="denomination5" class="block text-xs text-gray-500 mb-1">5元</label>
                <input
                  type="number"
                  id="denomination5"
                  v-model.number="formData.denominations['5']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="coins" class="block text-xs text-gray-500 mb-1">硬币（元）</label>
                <input
                  type="number"
                  id="coins"
                  v-model.number="formData.coins"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="元"
                >
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-blue-700">为提高办理效率，建议您提前将纸币按面额分类整理。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 取款业务表单 -->
      <div v-if="selectedBusiness === 'withdrawal'">
        <h3 class="text-sm font-medium text-gray-700 mb-2">取款业务详情</h3>
<div class="text-xs text-gray-500 mb-4">
  办理步骤: {{ currentTypeConfig.steps.join(' → ') }}
</div>
        <div class="space-y-4">
          <div>
            <label for="withdrawalAmount" class="block text-sm font-medium text-gray-700 mb-1">预计取款总额（元）</label>
            <input
              type="number"
              id="withdrawalAmount"
              v-model.number="formData.amount"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="请输入预计取款金额"
            >
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="withdrawNewNote"
              v-model="formData.isNewNote"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            >
            <label for="withdrawNewNote" class="ml-2 block text-sm text-gray-700">是否兑换为新钞</label>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">所需面额偏好（视库存情况满足）</label>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="need100"
                  v-model="formData.denominationPreferences['100']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="need100" class="ml-2 block text-sm text-gray-700">需要100元面额</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['100']"
                  min="0"
                  class="ml-3 w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['100']"
                >
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="need50"
                  v-model="formData.denominationPreferences['50']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="need50" class="ml-2 block text-sm text-gray-700">需要50元面额</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['50']"
                  min="0"
                  class="ml-3 w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['50']"
                >
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="needSmallChange"
                  v-model="formData.needSmallChange"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="needSmallChange" class="ml-2 block text-sm text-gray-700">需要20元及以下零钞</label>
                <input
                  type="number"
                  v-model.number="formData.smallChangeAmount"
                  min="0"
                  class="ml-3 w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="元"
                  :disabled="!formData.needSmallChange"
                >
              </div>
            </div>
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
  <div class="flex">
    <svg class="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <p class="text-sm text-amber-700">大额取现（如超过5万元）请提前一天预约，以便支行为您备足现金。</p>
  </div>
</div>

<div v-if="formData.amount >= 50000" class="flex items-center">
  <input
    type="checkbox"
    id="hasAdvancedBooking"
    v-model="formData.hasAdvancedBooking"
    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
  >
  <label for="hasAdvancedBooking" class="ml-2 block text-sm text-gray-700">
    我已提前一天预约大额取款
  </label>
</div>
        </div>
      </div>

      <!-- 兑换零钱业务表单 -->
      <div v-if="selectedBusiness === 'changeExchange'">
        <h3 class="text-sm font-medium text-gray-700 mb-2">零钱兑换业务详情</h3>
<div class="text-xs text-gray-500 mb-4">
  办理步骤: {{ currentTypeConfig.steps.join(' → ') }}
</div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">兑换方向</label>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="changeToNote"
                  v-model="formData.exchangeDirection"
                  value="changeToNote"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                >
                <label for="changeToNote" class="ml-3 block text-sm text-gray-700">零钱换整钞（提交零钱信息）</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="noteToChange"
                  v-model="formData.exchangeDirection"
                  value="noteToChange"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                >
                <label for="noteToChange" class="ml-3 block text-sm text-gray-700">整钞换零钱（提交所需零钱信息）</label>
              </div>
            </div>
          </div>

          <div>
            <label for="exchangeAmount" class="block text-sm font-medium text-gray-700 mb-1">总金额（元）</label>
            <input
              type="number"
              id="exchangeAmount"
              v-model.number="formData.amount"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="请输入兑换总金额"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">面额与数量明细（尽可能填写）</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label for="change100" class="block text-xs text-gray-500 mb-1">100元</label>
                <input
                  type="number"
                  id="change100"
                  v-model.number="formData.denominations['100']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="change50" class="block text-xs text-gray-500 mb-1">50元</label>
                <input
                  type="number"
                  id="change50"
                  v-model.number="formData.denominations['50']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="change20" class="block text-xs text-gray-500 mb-1">20元</label>
                <input
                  type="number"
                  id="change20"
                  v-model.number="formData.denominations['20']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="change10" class="block text-xs text-gray-500 mb-1">10元</label>
                <input
                  type="number"
                  id="change10"
                  v-model.number="formData.denominations['10']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="change5" class="block text-xs text-gray-500 mb-1">5元</label>
                <input
                  type="number"
                  id="change5"
                  v-model.number="formData.denominations['5']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
              <div>
                <label for="change1" class="block text-xs text-gray-500 mb-1">1元</label>
                <input
                  type="number"
                  id="change1"
                  v-model.number="formData.denominations['1']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                >
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-blue-700">零钱数量巨大时，清点可能需要较长时间，感谢您的理解与耐心。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 兑换残币业务表单 -->
      <div v-if="selectedBusiness === 'damagedExchange'">
        <h3 class="text-sm font-medium text-gray-700 mb-2">残币兑换业务详情</h3>
<div class="text-xs text-gray-500 mb-4">
  办理步骤: {{ currentTypeConfig.steps.join(' → ') }}
</div>
        <div class="space-y-4">
          <div>
            <label for="damagedAmount" class="block text-sm font-medium text-gray-700 mb-1">预计破损纸币总额（元，大致估算）</label>
            <input
              type="number"
              id="damagedAmount"
              v-model.number="formData.amount"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="请输入预计总额"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">破损类型（可多选）</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="damageTear"
                  v-model="formData.damageTypes"
                  value="tear"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageTear" class="ml-2 block text-sm text-gray-700">撕裂/缺损</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="damageStain"
                  v-model="formData.damageTypes"
                  value="stain"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageStain" class="ml-2 block text-sm text-gray-700">污损/涂画</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="damageBurn"
                  v-model="formData.damageTypes"
                  value="burn"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageBurn" class="ml-2 block text-sm text-gray-700">火烧/水浸</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="damageInsect"
                  v-model="formData.damageTypes"
                  value="insect"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageInsect" class="ml-2 block text-sm text-gray-700">虫蛀</label>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-blue-700">根据人民银行规定，破损币的兑换有具体标准，最终金额以柜面实际鉴定为准。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 新钞兑换业务表单 -->
      <div v-if="selectedBusiness === 'newNoteExchange'">
        <h3 class="text-sm font-medium text-gray-700 mb-2">新钞兑换业务详情</h3>
<div class="text-xs text-gray-500 mb-4">
  办理步骤: {{ currentTypeConfig.steps.join(' → ') }}
</div>
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="newNoteFlag"
              v-model="formData.isNewNote"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            >
            <label for="newNoteFlag" class="ml-2 block text-sm text-gray-700">是否兑换为新钞</label>
          </div>
          <div>
            <label for="newNoteAmount" class="block text-sm font-medium text-gray-700 mb-1">兑换总额（元）</label>
            <input
              type="number"
              id="newNoteAmount"
              v-model.number="formData.amount"
              min="0"
              step="0.01"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="请输入兑换金额"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">所需面额（可多选）</label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="newNote100"
                  v-model="formData.denominationPreferences['100']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="newNote100" class="ml-2 block text-sm text-gray-700">100元</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['100']"
                  min="0"
                  class="ml-3 w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['100']"
                >
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="newNote50"
                  v-model="formData.denominationPreferences['50']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="newNote50" class="ml-2 block text-sm text-gray-700">50元</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['50']"
                  min="0"
                  class="ml-3 w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['50']"
                >
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="newNote20"
                  v-model="formData.denominationPreferences['20']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="newNote20" class="ml-2 block text-sm text-gray-700">20元</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['20']"
                  min="0"
                  class="ml-3 w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['20']"
                >
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-blue-700">新钞兑换需提前预约，实际可用面额以网点库存为准。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 业务信息摘要 -->
<div v-if="formData.amount && selectedBusiness" class="border-t pt-4 mt-4 animate-fadeIn">
  <h4 class="text-sm font-medium text-gray-700 mb-2">业务信息摘要</h4>
  <div class="text-sm text-gray-600 space-y-1">
    <p><span class="font-medium">业务类型:</span> {{ currentTypeConfig.label }} ({{ currentTypeConfig.code }})</p>
    <p><span class="font-medium">办理金额:</span> ¥{{ formData.amount.toFixed(2) }}</p>
    <p v-if="selectedBusiness === 'deposit' && (hasDenomination || hasCoins)">
      <span class="font-medium">面额构成:</span> {{ getDenominationSummary() }}
    </p>
    <p v-if="selectedBusiness === 'withdrawal' && formData.amount >= 50000">
      <span class="font-medium">大额预约:</span> {{ formData.hasAdvancedBooking ? '已预约' : '未预约' }}
    </p>
  </div>
</div>

<!-- 操作按钮 -->
<div class="flex justify-between mt-8">
      <button
        type="button"
        @click="emit('prev')"
        class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        上一步
      </button>

      <button
        type="button"
        @click="handleNext"
        :disabled="!selectedBusiness || !formData.amount"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        :class="(!selectedBusiness || !formData.amount) ? 'opacity-50 cursor-not-allowed' : ''"
      >
        下一步：选择网点和时间
        <svg class="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, computed, defineEmits } from 'vue'
import { useAppointmentStore } from '@/stores/appointmentStore'

const emit = defineEmits(['prev', 'next'])
const appointmentStore = useAppointmentStore()

// 业务类型数据 - 从API动态加载
// 业务类型数据已从 API 获取，无需重复声明
// 若需使用，请直接引用已声明的 businessTypes ref
  // 已在下方统一声明 loadError，此处移除重复定义
  // const loadError = ref(null);

  // 已在下方统一声明 loadError，此处移除重复定义
  // const loadError = ref('');

  // 初始化加载业务类型
// 本步骤不再拉取业务类型，由上一步确定类型

// 业务类型配置 - 从API获取

// 根据用户权限过滤业务类型
// 该变量已在外部定义，此处无需重复声明

// 业务类型选择
const selectedBusiness = ref('')

// 初始化表单数据
// 当前选中业务的配置（已声明，无需重复定义）

onMounted(() => {
  const savedBusiness = appointmentStore.businessInfo;
  selectedBusiness.value = savedBusiness.type || 'withdrawal';
  // 合并保存的数据并添加默认值
  Object.assign(formData, {
    hasAdvancedBooking: false,
    isNewNote: false,
    ...savedBusiness.details
  });
})

// 取消类型权限过滤逻辑

// 表单重置函数
const resetForm = (newType) => {
  // 基础重置
  formData.amount = null;
  formData.denominations = Object.fromEntries(
    Object.keys(formData.denominations).map(k => [k, null])
  );
  
  // 业务类型特定重置
  const typeConfig = businessTypes.find(t => t.value === newType);
  if (!typeConfig) return;

  switch(newType) {
    case 'deposit':
      formData.coins = null;
      break;
    case 'withdrawal':
      formData.denominationPreferences = { '100': false, '50': false, '20': false };
      formData.needSmallChange = false;
      formData.smallChangeAmount = null;
      formData.hasAdvancedBooking = false; // 新增大额预约标记
      break;
    case 'changeExchange':
      formData.exchangeDirection = 'noteToChange';
      break;
    case 'damagedExchange':
      formData.damageTypes = [];
      break;
    case 'newNoteExchange':
      formData.denominationPreferences = { '100': false, '50': false, '20': false };
      break;
    default:
      // 清除所有非基础字段
      formData.coins = null;
      formData.denominationPreferences = { '100': false, '50': false, '20': false };
      formData.needSmallChange = false;
      formData.smallChangeAmount = null;
      formData.exchangeDirection = 'noteToChange';
      formData.damageTypes = [];
      formData.hasAdvancedBooking = false;
  }
}

// 监听业务类型变化，执行表单重置
watch(
  () => selectedBusiness.value,
  (newType, oldType) => {
    if (newType && newType !== oldType) {
      resetForm(newType);
      // 清除错误提示
      formErrors.value = {};
    }
  },
  { immediate: true }
)

// 表单验证错误
const formErrors = reactive({});

// 表单数据
// 添加防重复提交状态
// 状态管理
  const isSubmitting = ref(false);

// 当前选中业务的配置
const currentTypeConfig = computed(() => {
  const found = businessTypes.find(type => type.value === selectedBusiness.value);
  return found ? { ...found, steps: Array.isArray(found.steps) ? found.steps : [] } : { steps: [] };
});

const businessTypes = [
  { value: 'deposit',     label: '存款',          code: 'D', description: '现金存入账户', steps: ['取号', '填写存款单', '柜台办理', '确认回执'] },
  { value: 'withdrawal',  label: '取款',          code: 'W', description: '从账户提取现金', steps: ['取号', '填写取款单', '柜台办理', '清点现金'] },
  { value: 'changeExchange', label: '零钱兑换',   code: 'C', description: '整钞与零钱互换', steps: ['取号', '说明需求', '柜台办理', '确认金额'] },
  { value: 'damagedExchange', label: '残币兑换',  code: 'M', description: '破损币换新币', steps: ['取号', '提交残币', '鉴定评估', '兑换完成'] },
  { value: 'newNoteExchange', label: '新钞兑换',  code: 'N', description: '兑换全新纸币', steps: ['取号', '选择面额', '柜台办理', '确认金额'] }
];

const formData = reactive({
  amount: null,
  denominations: {
    '100': null,
    '50': null,
    '20': null,
    '10': null,
    '5': null,
    '1': null
  },
  coins: null,
  denominationPreferences: {
    '100': false,
    '50': false,
    '20': false
  },
  needSmallChange: false,
  smallChangeAmount: null,
  exchangeDirection: 'noteToChange',
  damageTypes: [],
  hasAdvancedBooking: false, // 大额取款预约标记
  isNewNote: false
})

// 监听表单数据变化，保存到store
watch(
  [selectedBusiness, formData],
  () => {
    if (selectedBusiness.value) {
      appointmentStore.setBusinessInfo({
        type: selectedBusiness.value,
        details: {...formData}
      })
    }
  },
  { deep: true }
)

// 面额摘要生成 - 添加异常处理
const getDenominationSummary = () => {
  try {
    const denominationEntries = Object.entries(formData.denominations)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${k}元 x ${v}张`);

    if (formData.coins > 0) {
      denominationEntries.push(`硬币 ¥${formData.coins.toFixed(2)}`);
    }

    return denominationEntries.join(', ') || '未指定';
  } catch (error) {
    console.error('生成面额摘要失败:', error);
    return '计算错误';
  }
};

// 存款业务实时验证
const hasDenomination = computed(() => 
  Object.values(formData.denominations).some(v => v > 0)
);
const hasCoins = computed(() => formData.coins > 0);

watch(
  () => [formData.denominations, formData.coins],
  () => {
    if (selectedBusiness.value === 'deposit' && formData.amount > 0) {
      formErrors.depositDenomination = (!hasDenomination.value && !hasCoins.value) 
        ? '请至少填写一种面额或硬币数量' 
        : '';
    }
  },
  { deep: true }
);

// 下一步
const handleNext = () => {
  try {
    // 全面表单验证
    let isValid = true;
    let errorMessage = '';

    // 防重复提交检查
    if (isSubmitting.value) {
      window.$notify.warning({ title: '提示', message: '操作进行中，请稍后再试', duration: 3000 });
      return;
    }
    isSubmitting.value = true;

    // 输入数据清理
    formData.amount = parseFloat(formData.amount.toFixed(2));
    for (const key in formData.denominations) {
      if (formData.denominations[key] !== null) {
        formData.denominations[key] = Math.floor(Math.abs(formData.denominations[key])) || null;
      }
    }

  // 基础金额验证 - 增强版
  if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
    isValid = false;
    errorMessage = '请输入有效的金额';
  } else if (formData.amount > 1000000) {
    // 大额交易限制（100万）
    isValid = false;
    errorMessage = '单笔交易金额不能超过100万元';
  } else if (formData.amount.toString().split('.')[1]?.length > 2) {
    // 限制小数点后两位
    isValid = false;
    errorMessage = '金额最多只能保留两位小数';
  }

  // 业务类型特定验证
  else if (selectedBusiness.value === 'deposit') {
    // 存款验证：检查至少有一种面额或硬币
    const hasDenomination = Object.values(formData.denominations).some(v => v > 0);
    const hasCoins = formData.coins > 0;
    if (!hasDenomination && !hasCoins) {
      isValid = false;
      errorMessage = '请至少填写一种面额或硬币数量';
    }
  }
  else if (selectedBusiness.value === 'withdrawal') {
    // 取款验证：检查大额取款预约提示
    if (formData.amount >= 50000 && !formData.hasAdvancedBooking) {
      isValid = false;
      errorMessage = '5万元及以上取款需提前一天预约，请勾选已预约选项';
    }
  }
  else if (['damagedExchange', 'newNoteExchange'].includes(selectedBusiness.value)) {
    // 特殊兑换业务验证
    const hasSelectedDenomination = Object.values(formData.denominationPreferences).some(v => v);
    if (!hasSelectedDenomination) {
      isValid = false;
      errorMessage = '请至少选择一种面额';
    }
  }

  if (!isValid) {
    // 使用全局通知组件替代alert
    window.$notify.error({
      title: '表单验证失败',
      message: errorMessage,
      duration: 5000
    });
    return;
  }

  // 保存业务信息到store
  appointmentStore.setBusinessInfo({
    type: selectedBusiness.value,
    details: {...formData},
    status: 'completed',
    updatedAt: new Date().toISOString()
  });

  emit('next');
    isSubmitting.value = false;
  } catch (error) {
    console.error('提交表单时发生错误:', error);
    window.$notify.error({ title: '系统错误', message: '处理请求时发生错误，请稍后重试', duration: 5000 });
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>