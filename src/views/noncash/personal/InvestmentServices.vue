<template>
  <div class="p-4 bg-white min-h-screen">
    <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800 mb-6">投资理财服务</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 基金理财 -->
      <div class="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-primary mb-4">基金理财</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">基金购买</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">购买</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">基金赎回</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">赎回</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">基金定投</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">设置</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">基金查询</span>
            <button class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">查询</button>
          </div>
        </div>
      </div>
      
      <!-- 理财产品 -->
      <div class="bg-green-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-success mb-4">理财产品</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">定期理财</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">购买</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">活期理财</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">购买</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">结构性存款</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">购买</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">理财查询</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">查询</button>
          </div>
        </div>
      </div>
      
      <!-- 股票交易 -->
      <div class="bg-amber-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-warning mb-4">股票交易</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">买入股票</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">买入</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">卖出股票</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">卖出</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">持仓查询</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">查询</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">股票行情</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">查看</button>
          </div>
        </div>
      </div>
      
      <!-- 贵金属 -->
      <div class="bg-indigo-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-indigo-600 mb-4">贵金属</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">黄金购买</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">购买</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">黄金赎回</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">赎回</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">贵金属行情</span>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">查看</button>
          </div>
        </div>
      </div>
      
      <!-- 外汇交易 -->
      <div class="bg-purple-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-purple-600 mb-4">外汇交易</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">外汇兑换</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">兑换</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">外汇行情</span>
            <button class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">查看</button>
          </div>
        </div>
      </div>
      
      <!-- 国债逆回购 -->
      <div class="bg-teal-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-teal-600 mb-4">国债逆回购</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">国债购买</span>
            <button class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">购买</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">持仓查询</span>
            <button class="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">查询</button>
          </div>
        </div>
      </div>
      
      <!-- 风险评估 -->
      <div class="bg-red-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-3">
        <h2 class="text-xl font-semibold text-danger mb-4">风险评估</h2>
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div class="mb-4 md:mb-0">
            <p class="text-gray-700">您当前的风险评估等级：<span class="font-medium text-danger">平衡型</span></p>
            <p class="text-sm text-gray-500 mt-1">评估有效期至：2024年12月31日</p>
          </div>
          <button class="bg-danger text-white px-6 py-2 rounded hover:bg-danger/90 transition-colors">重新评估</button>
        </div>
      </div>
    </div>
    
    <!-- 推荐产品 -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">推荐理财产品</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="product in recommendedProducts" :key="product.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
          <h3 class="font-medium text-gray-800 mb-2">{{ product.name }}</h3>
          <p class="text-2xl font-bold text-danger mb-2">{{ product.rate }}%</p>
          <p class="text-sm text-gray-500 mb-4">预期年化收益率</p>
          <p class="text-sm text-gray-600 mb-1">{{ product.period }} | {{ product.minAmount }}起投</p>
          <button class="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors">立即购买</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestmentServices',
  data() {
    return {
      recommendedProducts: [
        {
          id: 1,
          name: '稳健理财90天',
          rate: 3.8,
          period: '90天',
          minAmount: '1万元'
        },
        {
          id: 2,
          name: '安鑫宝180天',
          rate: 4.2,
          period: '180天',
          minAmount: '5万元'
        },
        {
          id: 3,
          name: '优选成长混合基金',
          rate: 8.5,
          period: '灵活',
          minAmount: '1千元'
        },
        {
          id: 4,
          name: '黄金ETF联接',
          rate: 6.2,
          period: '灵活',
          minAmount: '100元'
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
}
</style>