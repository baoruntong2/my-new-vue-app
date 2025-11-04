<template>
  <div class="p-4 bg-white min-h-screen w-full transition-opacity duration-300" :style="{ opacity: pageLoaded ? 1 : 0 }">
    <!-- 头部导航栏 -->
    <div class="flex items-center justify-between mb-6">
      <button 
        @click="backToAccount" 
        class="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>返回账户中心</span>
      </button>
      <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800">贷款服务</h1>
      <div class="w-28"></div> <!-- 占位，保持标题居中 -->
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-full">
      <!-- 个人贷款办理 -->
      <div class="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-primary mb-4">个人贷款办理</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">住房按揭贷款</span>
            <button @click="handleServiceAction('住房按揭贷款')" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">立即申请</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">汽车消费贷款</span>
            <button @click="handleServiceAction('汽车消费贷款')" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">立即申请</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">个人消费贷款</span>
            <button @click="handleServiceAction('个人消费贷款')" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">立即申请</button>
          </div>
        </div>
      </div>
      
      <!-- 公积金服务 -->
      <div class="bg-green-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-success mb-4">公积金服务</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">缴存查询</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">立即查询</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">提取办理</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">立即办理</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">贷款申请</span>
            <button class="bg-success text-white px-4 py-2 rounded hover:bg-success/90 transition-colors">立即申请</button>
          </div>
        </div>
      </div>
      
      <!-- 贷款还款 -->
      <div class="bg-amber-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-xl font-semibold text-warning mb-4">贷款还款</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">等额本息还款</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">办理</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">等额本金还款</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">办理</button>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">提前还款</span>
            <button class="bg-warning text-white px-4 py-2 rounded hover:bg-warning/90 transition-colors">申请</button>
          </div>
        </div>
      </div>
      
      <!-- 贷款计算器 -->
      <div class="bg-indigo-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <h2 class="text-xl font-semibold text-indigo-600 mb-4">贷款计算器</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">贷款金额(元)</label>
            <input type="number" v-model="loanAmount" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="请输入贷款金额">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">贷款期限(年)</label>
            <input type="number" v-model="loanTerm" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="请输入贷款期限">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">年利率(%)</label>
            <input type="number" v-model="loanRate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="请输入年利率" step="0.01">
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">还款方式</label>
          <div class="flex space-x-4">
            <label class="inline-flex items-center">
              <input type="radio" name="repaymentType" value="equal-principal-interest" v-model="repaymentType" class="text-indigo-600 focus:ring-indigo-500 h-4 w-4">
              <span class="ml-2">等额本息</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" name="repaymentType" value="equal-principal" v-model="repaymentType" class="text-indigo-600 focus:ring-indigo-500 h-4 w-4">
              <span class="ml-2">等额本金</span>
            </label>
          </div>
        </div>
        <button @click="calculateLoan" class="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">计算</button>
        
        <!-- 计算结果 -->
        <div v-if="showResult" class="mt-6 bg-white p-4 rounded-lg border border-gray-200 animate-fadeIn">
          <h3 class="font-semibold text-gray-800 mb-2">计算结果</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p class="text-sm text-gray-600">月还款额(等额本息)</p>
              <p class="text-lg font-medium text-indigo-600">{{ monthlyPayment.toLocaleString() }} 元</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">总还款额</p>
              <p class="text-lg font-medium text-indigo-600">{{ totalPayment.toLocaleString() }} 元</p>
            </div>
            <div>
              <p class="text-sm text-gray-600">总利息</p>
              <p class="text-lg font-medium text-indigo-600">{{ totalInterest.toLocaleString() }} 元</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/accountStore';

const router = useRouter();
const accountStore = useAccountStore();
const pageLoaded = ref(false);

// 贷款计算相关数据
const loanAmount = ref(100000);
const loanTerm = ref(30);
const loanRate = ref(4.9);
const repaymentType = ref('equal-principal-interest');
const monthlyPayment = ref(0);
const totalPayment = ref(0);
const totalInterest = ref(0);
const showResult = ref(false);

// 返回个人账户信息界面
const backToAccount = () => {
  // 记录返回操作
  console.log('返回个人账户信息界面');
  
  // 清除导航状态
  accountStore.clearNavigationState();
  
  // 添加返回过渡效果
  pageLoaded.value = false;
  
  // 延迟导航，等待过渡效果完成
  setTimeout(() => {
    router.push('/');
  }, 200);
};

// 监听业务按钮点击，添加业务处理后的导航逻辑
const handleServiceAction = (serviceType) => {
  console.log(`处理业务: ${serviceType}`);
  
  // 这里可以添加业务处理逻辑
  // 处理完成后可以导航回账户中心或其他页面
  
  // 例如：模拟业务处理后返回
  setTimeout(() => {
    alert(`${serviceType} 申请已提交，请等待审核`);
  }, 500);
};

// 贷款计算方法
const calculateLoan = () => {
  // 基本验证
  if (!loanAmount.value || !loanTerm.value || !loanRate.value) {
    alert('请填写完整的贷款信息');
    return;
  }
  
  // 转换年利率为月利率
  const monthlyRate = loanRate.value / 100 / 12;
  // 总月数
  const totalMonths = loanTerm.value * 12;
  
  if (repaymentType.value === 'equal-principal-interest') {
    // 等额本息计算公式
    const temp = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment.value = (loanAmount.value * monthlyRate * temp) / (temp - 1);
    totalPayment.value = monthlyPayment.value * totalMonths;
  } else {
    // 等额本金计算公式
    // 每月应还本金
    const monthlyPrincipal = loanAmount.value / totalMonths;
    // 首月利息
    let firstMonthInterest = loanAmount.value * monthlyRate;
    // 首月还款额
    monthlyPayment.value = monthlyPrincipal + firstMonthInterest;
    
    // 总利息计算
    totalInterest.value = (monthlyRate * loanAmount.value * (totalMonths + 1)) / 2;
    totalPayment.value = loanAmount.value + totalInterest.value;
  }
  
  showResult.value = true;
};

// 页面加载时触发过渡效果
onMounted(() => {
  setTimeout(() => {
    pageLoaded.value = true;
  }, 50);
});
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
  
  .w-28 {
    width: 60px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* 按钮悬停效果增强 */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
}
</style>