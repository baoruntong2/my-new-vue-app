<template>
  <div class="space-y-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">业务信息填写</h2>
      <p class="text-sm text-gray-600">请填写您需要办理的业务详细信息</p>
    </div>

    <!-- 业务类型选择界面（当没有选择业务类型时显示） -->
    <div v-if="!selectedBusiness" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        请选择业务类型
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          class="p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="selectedBusiness === 'deposit' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
          @click="selectBusinessType('deposit')"
        >
          <div class="flex items-center">
            <input
              type="radio"
              id="selectDeposit"
              :checked="selectedBusiness === 'deposit'"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            >
            <label for="selectDeposit" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer flex-1">
              存款
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-2 ml-7">现金存入账户</p>
        </div>
        <div 
          class="p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="selectedBusiness === 'withdrawal' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
          @click="selectBusinessType('withdrawal')"
        >
          <div class="flex items-center">
            <input
              type="radio"
              id="selectWithdrawal"
              :checked="selectedBusiness === 'withdrawal'"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            >
            <label for="selectWithdrawal" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer flex-1">
              取款
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-2 ml-7">从账户提取现金</p>
        </div>
        <div 
          class="p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="selectedBusiness === 'exchange' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
          @click="selectBusinessType('exchange')"
        >
          <div class="flex items-center">
            <input
              type="radio"
              id="selectExchange"
              :checked="selectedBusiness === 'exchange'"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            >
            <label for="selectExchange" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer flex-1">
              零钱残币兑换
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-2 ml-7">零钱或残币兑换服务</p>
        </div>
      </div>
    </div>

    <!-- 零钱残币兑换选择界面 -->
    <div v-if="selectedBusiness === 'exchange'" class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
        <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
        </svg>
        请选择兑换类型
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          class="p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="exchangeSubType === 'changeExchange' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
          @click="exchangeSubType = 'changeExchange'"
        >
          <div class="flex items-center">
            <input
              type="radio"
              id="changeExchange"
              v-model="exchangeSubType"
              value="changeExchange"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            >
            <label for="changeExchange" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer flex-1">
              零钱兑换
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-2 ml-7">整钞与零钱互换</p>
        </div>
        <div 
          class="p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
          :class="exchangeSubType === 'damagedExchange' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'"
          @click="exchangeSubType = 'damagedExchange'"
        >
          <div class="flex items-center">
            <input
              type="radio"
              id="damagedExchange"
              v-model="exchangeSubType"
              value="damagedExchange"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            >
            <label for="damagedExchange" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer flex-1">
              残币兑换
            </label>
          </div>
          <p class="text-xs text-gray-500 mt-2 ml-7">破损币换新币</p>
        </div>
      </div>
    </div>

    <!-- 动态业务表单 -->
    <div v-if="selectedBusiness !== 'exchange' || exchangeSubType" class="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
      
      <!-- 存款业务表单 -->
      <div v-if="selectedBusiness === 'deposit'">
        <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          存款业务详情
        </h3>
        
        <div class="space-y-5">
          <!-- 预计存款总额 -->
          <div>
            <label for="depositAmount" class="block text-sm font-medium text-gray-700 mb-2">
              预计存款总额：<span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="number"
                id="depositAmount"
                v-model.number="formData.amount"
                min="0"
                step="0.01"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="请输入预计存款金额"
              >
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
            </div>
          </div>

          <!-- 主要面额构成 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              主要面额构成（估算，可选填）
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label for="denomination100" class="block text-xs text-gray-500 mb-1">100元</label>
                <div class="relative">
                  <input
                    type="number"
                    id="denomination100"
                    v-model.number="formData.denominations['100']"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="张"
                  >
                </div>
              </div>
              <div>
                <label for="denomination50" class="block text-xs text-gray-500 mb-1">50元</label>
                <div class="relative">
                  <input
                    type="number"
                    id="denomination50"
                    v-model.number="formData.denominations['50']"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="张"
                  >
                </div>
              </div>
              <div>
                <label for="denomination20" class="block text-xs text-gray-500 mb-1">20元</label>
                <div class="relative">
                  <input
                    type="number"
                    id="denomination20"
                    v-model.number="formData.denominations['20']"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="张"
                  >
                </div>
              </div>
              <div>
                <label for="denomination10" class="block text-xs text-gray-500 mb-1">10元</label>
                <div class="relative">
                  <input
                    type="number"
                    id="denomination10"
                    v-model.number="formData.denominations['10']"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="张"
                  >
                </div>
              </div>
              <div>
                <label for="denomination5" class="block text-xs text-gray-500 mb-1">5元</label>
                <div class="relative">
                  <input
                    type="number"
                    id="denomination5"
                    v-model.number="formData.denominations['5']"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="张"
                  >
                </div>
              </div>
              <div>
                <label for="denomination1" class="block text-xs text-gray-500 mb-1">1元</label>
                <div class="relative">
                  <input
                    type="number"
                    id="denomination1"
                    v-model.number="formData.denominations['1']"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="张"
                  >
                </div>
              </div>
            </div>
            <div class="mt-4">
              <label for="coins" class="block text-xs text-gray-500 mb-1">硬币</label>
              <div class="relative">
                <input
                  type="number"
                  id="coins"
                  v-model.number="formData.coins"
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="元"
                >
              </div>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
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
        <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          取款业务详情
        </h3>
        
        <div class="space-y-5">
          <!-- 预计取款总额 -->
          <div>
            <label for="withdrawalAmount" class="block text-sm font-medium text-gray-700 mb-2">
              预计取款总额：<span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="number"
                id="withdrawalAmount"
                v-model.number="formData.amount"
                min="0"
                step="0.01"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="请输入预计取款金额"
              >
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
            </div>
          </div>

          <!-- 是否兑换新钞 -->
          <div class="flex items-center p-3 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="isNewNoteExchange"
              v-model="formData.isNewNoteExchange"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            >
            <label for="isNewNoteExchange" class="ml-2 block text-sm text-gray-700 cursor-pointer flex-1">
              是否兑换新钞
            </label>
          </div>

          <!-- 所需面额偏好 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              所需面额偏好（视库存情况满足）
            </label>
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="need100"
                  v-model="formData.denominationPreferences['100']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="need100" class="ml-2 block text-sm text-gray-700 flex-1">需要100元面额</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['100']"
                  min="0"
                  class="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['100']"
                >
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="need50"
                  v-model="formData.denominationPreferences['50']"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="need50" class="ml-2 block text-sm text-gray-700 flex-1">需要50元面额</label>
                <input
                  type="number"
                  v-model.number="formData.denominations['50']"
                  min="0"
                  class="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="张"
                  :disabled="!formData.denominationPreferences['50']"
                >
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="needSmallChange"
                  v-model="formData.needSmallChange"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="needSmallChange" class="ml-2 block text-sm text-gray-700 flex-1">需要20元及以下零钞</label>
                <div class="relative">
                  <input
                    type="number"
                    v-model.number="formData.smallChangeAmount"
                    min="0"
                    step="0.01"
                    class="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="元"
                    :disabled="!formData.needSmallChange"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- 大额预约提示 -->
          <div v-if="formData.amount >= 50000" class="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
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

          <!-- 温馨提示 -->
          <div class="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-amber-700">大额取现（如超过5万元）请提前一天预约，以便支行为您备足现金。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 零钱兑换业务表单 -->
      <div v-if="exchangeSubType === 'changeExchange'">
        <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
          </svg>
          零钱兑换业务详情
        </h3>
        
        <div class="space-y-5">
          <!-- 兑换方向 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">兑换方向</label>
            <div class="space-y-3">
              <div class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="radio"
                  id="changeToNote"
                  v-model="formData.exchangeDirection"
                  value="changeToNote"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                >
                <label for="changeToNote" class="ml-3 block text-sm text-gray-700 cursor-pointer flex-1">
                  零钱换整钞（提交零钱信息）
                </label>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="radio"
                  id="noteToChange"
                  v-model="formData.exchangeDirection"
                  value="noteToChange"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                >
                <label for="noteToChange" class="ml-3 block text-sm text-gray-700 cursor-pointer flex-1">
                  整钞换零钱（提交所需零钱信息）
                </label>
              </div>
            </div>
          </div>

          <!-- 详细信息 -->
          <div>
            <label for="exchangeAmount" class="block text-sm font-medium text-gray-700 mb-2">
              总金额：<span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="number"
                id="exchangeAmount"
                v-model.number="formData.amount"
                min="0"
                step="0.01"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="请输入兑换总金额"
              >
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
            </div>
          </div>

          <!-- 面额与数量明细 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              面额与数量明细（尽可能填写）
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label for="change100" class="block text-xs text-gray-500 mb-1">100元</label>
                <input
                  type="number"
                  id="change100"
                  v-model.number="formData.denominations['100']"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="张"
                >
              </div>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-blue-700">零钱数量巨大时，清点可能需要较长时间，感谢您的理解与耐心。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 残币兑换业务表单 -->
      <div v-if="exchangeSubType === 'damagedExchange'">
        <h3 class="text-base font-semibold text-gray-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          残币兑换业务详情
        </h3>
        
        <div class="space-y-5">
          <!-- 预计破损纸币总额 -->
          <div>
            <label for="damagedAmount" class="block text-sm font-medium text-gray-700 mb-2">
              预计破损纸币总额（大致估算）：<span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="number"
                id="damagedAmount"
                v-model.number="formData.amount"
                min="0"
                step="0.01"
                required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="请输入预计总额"
              >
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">元</span>
            </div>
          </div>

          <!-- 破损类型 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">破损类型（可多选）</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  id="damageTear"
                  v-model="formData.damageTypes"
                  value="tear"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageTear" class="ml-2 block text-sm text-gray-700 cursor-pointer flex-1">撕裂/缺损</label>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  id="damageStain"
                  v-model="formData.damageTypes"
                  value="stain"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageStain" class="ml-2 block text-sm text-gray-700 cursor-pointer flex-1">污损/涂画</label>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  id="damageBurn"
                  v-model="formData.damageTypes"
                  value="burn"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageBurn" class="ml-2 block text-sm text-gray-700 cursor-pointer flex-1">火烧/水浸</label>
              </div>
              <div class="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  id="damageInsect"
                  v-model="formData.damageTypes"
                  value="insect"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="damageInsect" class="ml-2 block text-sm text-gray-700 cursor-pointer flex-1">虫蛀</label>
              </div>
            </div>
          </div>

          <!-- 温馨提示 -->
          <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p class="text-sm text-blue-700">根据人民银行规定，破损币的兑换有具体标准，最终金额以柜面实际鉴定为准。</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 业务信息摘要 -->
    <div v-if="formData.amount && (selectedBusiness !== 'exchange' || exchangeSubType)" class="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-5 mt-6 animate-fadeIn">
      <h4 class="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <svg class="w-4 h-4 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        业务信息摘要
      </h4>
      <div class="text-sm text-gray-700 space-y-2">
        <p v-if="currentBusinessLabel">
          <span class="font-medium text-gray-800">业务类型:</span> 
          <span class="ml-2">{{ currentBusinessLabel }}</span>
        </p>
        <p>
          <span class="font-medium text-gray-800">办理金额:</span> 
          <span class="ml-2 text-primary font-semibold">¥{{ formData.amount.toFixed(2) }}</span>
        </p>
        <p v-if="selectedBusiness === 'deposit' && (hasDenomination || hasCoins)">
          <span class="font-medium text-gray-800">面额构成:</span> 
          <span class="ml-2">{{ getDenominationSummary() }}</span>
        </p>
        <p v-if="selectedBusiness === 'withdrawal' && formData.isNewNoteExchange">
          <span class="font-medium text-gray-800">兑换新钞:</span> 
          <span class="ml-2 text-green-600">是</span>
        </p>
        <p v-if="selectedBusiness === 'withdrawal' && formData.amount >= 50000">
          <span class="font-medium text-gray-800">大额预约:</span> 
          <span class="ml-2" :class="formData.hasAdvancedBooking ? 'text-green-600' : 'text-amber-600'">
            {{ formData.hasAdvancedBooking ? '✓ 已预约' : '✗ 未预约' }}
          </span>
        </p>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="emit('prev')"
        class="inline-flex items-center px-6 py-2.5 border-2 border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        上一步
      </button>

      <button
        type="button"
        @click="handleNext"
        :disabled="!canProceed"
        class="inline-flex items-center px-6 py-2.5 border-2 border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { useAppointmentStore } from '@/stores/appointmentStore'

const emit = defineEmits(['prev', 'next'])
const appointmentStore = useAppointmentStore()

// 状态管理
const isSubmitting = ref(false)

// 业务类型选择 - 从store获取
const selectedBusiness = ref('')

// 零钱残币兑换子类型
const exchangeSubType = ref('')

// 表单数据
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
  hasAdvancedBooking: false,
  isNewNoteExchange: false // 是否兑换新钞
})

// 业务类型标签映射
const businessTypeLabels = {
  'deposit': '存款',
  'withdrawal': '取款',
  'changeExchange': '零钱兑换',
  'damagedExchange': '残币兑换',
  'exchange': '零钱残币兑换'
}

// 当前业务类型标签
const currentBusinessLabel = computed(() => {
  if (selectedBusiness.value === 'exchange' && exchangeSubType.value) {
    return businessTypeLabels[exchangeSubType.value] || ''
  }
  return businessTypeLabels[selectedBusiness.value] || ''
})

// 是否可以继续
const canProceed = computed(() => {
  if (!selectedBusiness.value) return false
  if (selectedBusiness.value === 'exchange' && !exchangeSubType.value) return false
  if (!formData.amount || formData.amount <= 0) return false
  return true
})

// 选择业务类型
const selectBusinessType = (type) => {
  selectedBusiness.value = type
  if (type === 'exchange') {
    exchangeSubType.value = ''
  } else {
    resetForm(type)
    appointmentStore.setBusinessInfo({
      type: type,
      details: {}
    })
  }
}

// 页面加载时初始化
onMounted(() => {
  // 从store恢复保存的业务类型和表单数据
  const savedBusiness = appointmentStore.businessInfo
  if (savedBusiness?.type) {
    // 处理零钱残币兑换的情况
    if (savedBusiness.type === 'changeExchange' || savedBusiness.type === 'damagedExchange') {
      selectedBusiness.value = 'exchange'
      exchangeSubType.value = savedBusiness.type
    } else {
      selectedBusiness.value = savedBusiness.type
    }
    
    // 恢复表单数据
    if (savedBusiness.details) {
      Object.assign(formData, {
        hasAdvancedBooking: false,
        isNewNoteExchange: false,
        exchangeDirection: 'noteToChange',
        ...savedBusiness.details
      })
    }
  } else {
    // 如果没有保存的业务类型，尝试从serviceType获取
    const serviceType = appointmentStore.serviceType
    if (serviceType === 'deposit' || serviceType === 'withdrawal') {
      selectedBusiness.value = serviceType
      // 同步设置到businessInfo
      appointmentStore.setBusinessInfo({
        type: serviceType,
        details: {}
      })
    } else if (serviceType === 'change') {
      // 零钱及残币兑换
      selectedBusiness.value = 'exchange'
      // 不设置exchangeSubType，让用户选择
    } else if (serviceType === 'new-notes') {
      // 新钞兑换，作为取款的一种特殊形式
      selectedBusiness.value = 'withdrawal'
      formData.isNewNoteExchange = true
      appointmentStore.setBusinessInfo({
        type: 'withdrawal',
        details: { isNewNoteExchange: true }
      })
    }
  }
  
  // 调试信息
  console.log('Step2Business initialized:', {
    selectedBusiness: selectedBusiness.value,
    exchangeSubType: exchangeSubType.value,
    serviceType: appointmentStore.serviceType,
    businessInfo: appointmentStore.businessInfo
  })
})

// 监听exchangeSubType变化，更新selectedBusiness用于保存
watch(exchangeSubType, (newType) => {
  if (newType) {
    // 重置表单
    resetForm(newType)
  }
})

// 表单重置函数
const resetForm = (newType) => {
  if (!newType) return
  
  // 基础重置
  formData.amount = null
  formData.denominations = Object.fromEntries(
    Object.keys(formData.denominations).map(k => [k, null])
  )
  
  // 业务类型特定重置
  switch(newType) {
    case 'deposit':
      formData.coins = null
      break
    case 'withdrawal':
      formData.denominationPreferences = { '100': false, '50': false, '20': false }
      formData.needSmallChange = false
      formData.smallChangeAmount = null
      formData.hasAdvancedBooking = false
      formData.isNewNoteExchange = false
      break
    case 'changeExchange':
      formData.exchangeDirection = 'noteToChange'
      break
    case 'damagedExchange':
      formData.damageTypes = []
      break
    default:
      formData.coins = null
      formData.denominationPreferences = { '100': false, '50': false, '20': false }
      formData.needSmallChange = false
      formData.smallChangeAmount = null
      formData.exchangeDirection = 'noteToChange'
      formData.damageTypes = []
      formData.hasAdvancedBooking = false
      formData.isNewNoteExchange = false
  }
}

// 监听表单数据变化，保存到store
watch(
  [selectedBusiness, exchangeSubType, formData],
  () => {
    const businessType = selectedBusiness.value === 'exchange' ? exchangeSubType.value : selectedBusiness.value
    if (businessType) {
      appointmentStore.setBusinessInfo({
        type: businessType,
        details: {...formData}
      })
    }
  },
  { deep: true }
)

// 面额摘要生成
const getDenominationSummary = () => {
  try {
    const denominationEntries = Object.entries(formData.denominations)
      .filter(([, v]) => v > 0)
      .map(([k, v]) => `${k}元 x ${v}张`)

    if (formData.coins > 0) {
      denominationEntries.push(`硬币 ¥${formData.coins.toFixed(2)}`)
    }

    return denominationEntries.join(', ') || '未指定'
  } catch (error) {
    console.error('生成面额摘要失败:', error)
    return '计算错误'
  }
}

// 存款业务实时验证
const hasDenomination = computed(() => 
  Object.values(formData.denominations).some(v => v > 0)
)
const hasCoins = computed(() => formData.coins > 0)

// 下一步
const handleNext = () => {
  try {
    let isValid = true
    let errorMessage = ''

    // 防重复提交检查
    if (isSubmitting.value) {
      window.$notify.warning({ title: '提示', message: '操作进行中，请稍后再试', duration: 3000 })
      return
    }
    
    // 检查是否选择了业务类型
    const businessType = selectedBusiness.value === 'exchange' ? exchangeSubType.value : selectedBusiness.value
    if (!businessType) {
      window.$notify.error({
        title: '表单验证失败',
        message: '请选择业务类型',
        duration: 5000
      })
      return
    }

    isSubmitting.value = true

    // 输入数据清理
    if (formData.amount) {
      formData.amount = parseFloat(formData.amount.toFixed(2))
    }
    for (const key in formData.denominations) {
      if (formData.denominations[key] !== null) {
        formData.denominations[key] = Math.floor(Math.abs(formData.denominations[key])) || null
      }
    }

    // 基础金额验证
    if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      isValid = false
      errorMessage = '请输入有效的金额'
    } else if (formData.amount > 1000000) {
      isValid = false
      errorMessage = '单笔交易金额不能超过100万元'
    } else if (formData.amount.toString().split('.')[1]?.length > 2) {
      isValid = false
      errorMessage = '金额最多只能保留两位小数'
    }

    // 业务类型特定验证
    if (businessType === 'deposit') {
      // 存款验证：可选填面额，不强制
    } else if (businessType === 'withdrawal') {
      // 取款验证：检查大额取款预约提示
      if (formData.amount >= 50000 && !formData.hasAdvancedBooking) {
        isValid = false
        errorMessage = '5万元及以上取款需提前一天预约，请勾选已预约选项'
      }
    } else if (businessType === 'damagedExchange') {
      // 残币兑换验证：破损类型可选
    }

    if (!isValid) {
      window.$notify.error({
        title: '表单验证失败',
        message: errorMessage,
        duration: 5000
      })
      isSubmitting.value = false
      return
    }

    // 保存业务信息到store
    appointmentStore.setBusinessInfo({
      type: businessType,
      details: {...formData},
      status: 'completed',
      updatedAt: new Date().toISOString()
    })

    emit('next')
    isSubmitting.value = false
  } catch (error) {
    console.error('提交表单时发生错误:', error)
    window.$notify.error({ title: '系统错误', message: '处理请求时发生错误，请稍后重试', duration: 5000 })
    isSubmitting.value = false
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

