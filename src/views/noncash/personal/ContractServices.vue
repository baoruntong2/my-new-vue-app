<template>
  <div class="p-4 bg-white min-h-screen">
    <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800 mb-6">签约管理服务</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 电子签名 -->
      <div class="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-primary mb-4">电子签名</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">签名注册</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">注册</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">签名重置</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">重置</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">签名管理</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">管理</button>
          </div>
        </div>
      </div>
      
      <!-- 代扣服务 -->
      <div class="bg-green-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-success mb-4">代扣服务</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">电费代扣</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">签约</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">水费代扣</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">签约</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">燃气费代扣</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">签约</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">话费代扣</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">签约</button>
          </div>
        </div>
      </div>
      
      <!-- 代收服务 -->
      <div class="bg-amber-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-warning mb-4">代收服务</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">工资代发</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">签约</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">奖金代发</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">签约</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">退休金代发</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">签约</button>
          </div>
        </div>
      </div>
      
      <!-- 第三方支付 -->
      <div class="bg-indigo-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-indigo-600 mb-4">第三方支付</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">微信支付绑定</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">绑定</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">支付宝绑定</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">绑定</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">云闪付绑定</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">绑定</button>
          </div>
        </div>
      </div>
      
      <!-- 自动还款 -->
      <div class="bg-purple-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-purple-600 mb-4">自动还款</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">信用卡自动还款</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">设置</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">贷款自动还款</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">设置</button>
          </div>
        </div>
      </div>
      
      <!-- 电子协议 -->
      <div class="bg-teal-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-teal-600 mb-4">电子协议</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">协议查询</span>
            <button class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">查询</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">协议下载</span>
            <button class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">下载</button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 当前签约列表 -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">当前签约服务</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr class="bg-gray-50">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">服务名称</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">签约日期</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">状态</th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contract in currentContracts" :key="contract.id" class="hover:bg-gray-50">
              <td class="py-3 px-4 border-b">{{ contract.name }}</td>
              <td class="py-3 px-4 border-b">{{ contract.signDate }}</td>
              <td class="py-3 px-4 border-b">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
                  contract.status === '有效' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800']">
                  {{ contract.status }}
                </span>
              </td>
              <td class="py-3 px-4 border-b">
                <button class="text-primary hover:text-primary/80 mr-3">详情</button>
                <button class="text-danger hover:text-danger/80">解约</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 签约提醒 -->
    <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h3 class="font-medium text-yellow-800 mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        签约须知
      </h3>
      <ul class="text-sm text-yellow-700 list-disc pl-5 space-y-1">
        <li>签约前请仔细阅读相关服务协议和条款</li>
        <li>请确保提供的信息真实有效</li>
        <li>如遇签约问题，请联系客服热线：95588</li>
        <li>部分服务可能需要额外的身份验证</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractServices',
  data() {
    return {
      currentContracts: [
        {
          id: 1,
          name: '信用卡自动还款',
          signDate: '2023-06-15',
          status: '有效'
        },
        {
          id: 2,
          name: '电费代扣',
          signDate: '2023-05-20',
          status: '有效'
        },
        {
          id: 3,
          name: '微信支付绑定',
          signDate: '2023-04-10',
          status: '有效'
        },
        {
          id: 4,
          name: '工资代发',
          signDate: '2023-03-01',
          status: '有效'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* 响应式设计 */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  
  h2 {
    font-size: 1.25rem;
  }
  
  /* 表格响应式处理 */
  .overflow-x-auto {
    overflow-x: auto;
  }
  
  table {
    font-size: 0.875rem;
  }
}
</style>