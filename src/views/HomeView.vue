<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- 主内容区域 -->
    <main class="flex-1 container mx-auto px-4 py-8">
      <!-- 加载状态 -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-64">
        <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-600">加载账户信息中...</p>
      </div>

      <!-- 错误状态 -->
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
        <p>{{ error }}</p>
        <button @click="retryLoad" class="text-sm font-medium text-red-800 hover:underline mt-1">重试</button>
      </div>

      <!-- 账户信息和交易记录区域 -->
      <div v-else class="space-y-6">
        <!-- 个人账户信息展示区 -->
        <AccountInfo />

        <!-- 账户交易记录与余额展示区 -->
        <AccountTabs />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAccountStore } from '@/stores/accountStore';
import AccountInfo from '@/components/account/AccountInfo.vue';
import AccountTabs from '@/components/account/AccountTabs.vue';

const accountStore = useAccountStore();
const isLoading = ref(true);
const error = ref(null);

// 重试加载数据
const retryLoad = async () => {
  isLoading.value = true;
  error.value = null;
  await loadAccountData();
};

// 加载账户数据
const loadAccountData = async () => {
  try {
    await accountStore.fetchUserInfo();
    accountStore.clearError();
  } catch (err) {
    error.value = accountStore.error || '加载账户信息失败，请稍后重试';
    console.error('Failed to load account data:', err);
  } finally {
    isLoading.value = false;
  }
};

// 页面加载时获取账户信息
onMounted(async () => {
  await loadAccountData();
});
</script>

<style scoped>
/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}


</style>