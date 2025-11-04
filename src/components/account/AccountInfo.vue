<template>
  <div class="account-info-container bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ userInfo.name }}</h2>
        <p class="text-gray-600">持有 {{ userInfo.accountCount }} 个账户</p>
      </div>
      <div class="flex items-center space-x-4">
        <button class="text-primary hover:text-primary/80 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
          </svg>
        </button>
        <button class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors">
          编辑资料
        </button>
        <router-link 
          to="/noncash/loan-services" 
          class="bg-success hover:bg-success/90 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
          @click="navigateToService()"
        >
          <span>办理业务</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </router-link>
      </div>
    </div>

    <div class="account-types">
      <h3 class="text-lg font-semibold mb-3 text-gray-700">账户类型</h3>
      <div class="flex flex-wrap gap-3">
        <div v-for="account in userInfo.accounts" :key="account.id" class="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 flex items-center">
          <span class="font-medium mr-2">{{ account.type }}</span>
          <span class="text-gray-500 text-sm">{{ account.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAccountStore } from '@/stores/accountStore';

const accountStore = useAccountStore();
const userInfo = ref({});

// 导航到业务办理界面并记录导航历史
const navigateToService = () => {
      // 记录用户操作日志
      console.log(`${userInfo.value.name} 导航至贷款服务`);
      
      // 可以在此处添加权限验证逻辑
      const hasPermission = checkUserPermission();
      
      if (hasPermission) {
        // 设置导航状态，用于界面过渡效果
        accountStore.setNavigationState({
          from: 'accountInfo',
          to: '贷款服务',
          timestamp: Date.now()
        });
      } else {
        // 无权限处理
        alert('您没有权限访问此服务');
      }
    };

// 检查用户权限
  const checkUserPermission = () => {
    // 实际应用中应从权限管理系统获取
    // 此处为简化示例，默认返回true
    return true;
  };

onMounted(async () => {
  await accountStore.fetchUserInfo();
  userInfo.value = accountStore.userInfo;
});
</script>

<style scoped>
.account-info-container {
  transition: all 0.3s ease;
}

.account-types {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>