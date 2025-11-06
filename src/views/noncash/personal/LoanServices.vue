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
      <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800">信贷服务</h1>
      <div class="w-28"></div> <!-- 占位，保持标题居中 -->
    </div>

    <!-- 标签页导航 -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-1 -mb-px">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors"
          :class="activeTab === tab.id 
            ? 'border-primary text-primary' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          <div class="flex items-center">
            <component :is="tab.icon" class="w-5 h-5 mr-2" />
            {{ tab.label }}
          </div>
        </button>
      </nav>
    </div>

    <!-- 标签页内容 -->
    <div class="tab-content">
      <!-- 我的贷款 -->
      <MyLoans v-if="activeTab === 'my-loans'" />

      <!-- 消费贷款 -->
      <ConsumerLoan v-if="activeTab === 'consumer-loan'" />

      <!-- 大额贷款 -->
      <LargeLoan v-if="activeTab === 'large-loan'" />

      <!-- 公积金业务 -->
      <HousingFund v-if="activeTab === 'housing-fund'" @switch-tab="handleTabSwitch" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/accountStore'
import MyLoans from './loan/MyLoans.vue'
import ConsumerLoan from './loan/ConsumerLoan.vue'
import LargeLoan from './loan/LargeLoan.vue'
import HousingFund from './loan/HousingFund.vue'

const router = useRouter()
const accountStore = useAccountStore()
const pageLoaded = ref(false)

// 当前激活的标签页
const activeTab = ref('my-loans')

// 标签页配置
const tabs = [
  {
    id: 'my-loans',
    label: '我的贷款',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      })
    ])
  },
  {
    id: 'consumer-loan',
    label: '消费贷款',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ])
  },
  {
    id: 'large-loan',
    label: '大额贷款',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      })
    ])
  },
  {
    id: 'housing-fund',
    label: '公积金业务',
    icon: () => h('svg', {
      class: 'w-5 h-5',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
      })
    ])
  }
]

// 处理标签页切换
const handleTabSwitch = (tabId) => {
  activeTab.value = tabId
}

// 返回个人账户信息界面
const backToAccount = () => {
  console.log('返回个人账户信息界面')
  accountStore.clearNavigationState()
  pageLoaded.value = false
  setTimeout(() => {
    router.push('/')
  }, 200)
}

// 页面加载时触发过渡效果
onMounted(() => {
  setTimeout(() => {
    pageLoaded.value = true
  }, 50)
})
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  
  .w-28 {
    width: 60px;
  }

  nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  nav button {
    white-space: nowrap;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
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
