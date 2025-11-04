<template>
  <div class="account-tabs-container flex h-full bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
    <!-- 账户标签侧边栏 -->
    <div class="w-56 border-r border-gray-200 bg-white flex flex-col">
      <div class="p-3 border-b border-gray-200">
        <h3 class="font-semibold text-gray-800">账户列表</h3>
      </div>
      <div class="flex-1 overflow-y-auto">
        <div v-for="typeGroup in accountTypes" :key="typeGroup.type" class="mb-4">
          <div class="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ typeGroup.type }}
          </div>
          <div class="px-1">
            <button
              v-for="account in typeGroup.accounts"
              :key="account.id"
              @click="selectAccount(account.id)"
              :class="[ 
                'w-full text-left px-3 py-3 rounded-md transition-colors flex items-center justify-between',
                currentAccount?.id === account.id
                  ? 'bg-primary/10 text-primary border-l-4 border-primary'
                  : 'hover:bg-gray-50 text-gray-700'
              ]"
            >
              <div>
                <div class="font-medium">{{ account.name }}</div>
                <div class="text-xs text-gray-500 mt-0.5">{{ account.number }}</div>
              </div>
              <div class="text-right">
                <div class="font-semibold">{{ formatCurrency(account.balance) }}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 账户内容区域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 账户信息头部 -->
      <div class="p-4 border-b border-gray-200 bg-white">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-semibold text-gray-800">{{ currentAccount?.name }}</h3>
          <div class="text-2xl font-bold text-primary">{{ formatCurrency(currentAccount?.balance || 0) }}</div>
        </div>
        <div class="text-sm text-gray-500">{{ currentAccount?.number }}</div>
      </div>

      <!-- 交易记录查询工具栏 -->
      <TransactionFilters
        :transaction-types="transactionTypes"
        :status-options="statusOptions"
        :filters="searchFilters"
        @update-filters="updateFilters"
        @clear-filters="clearFilters"
      />

      <!-- 交易记录列表 -->
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="isLoading" class="flex justify-center items-center h-40">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
            <p class="text-gray-600">加载交易记录中...</p>
          </div>
        </div>

        <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {{ error }}
        </div>

        <div v-else-if="filteredTransactions.length === 0" class="text-center py-10 text-gray-500">
          没有找到符合条件的交易记录
        </div>

        <div v-else class="space-y-3">
          <div class="grid grid-cols-12 text-xs font-semibold text-gray-500 uppercase tracking-wider pb-2 border-b border-gray-200">
            <div class="col-span-3">日期</div>
            <div class="col-span-3">描述</div>
            <div class="col-span-2">类型</div>
            <div class="col-span-2">状态</div>
            <div class="col-span-2 text-right">金额</div>
          </div>

          <div
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            class="grid grid-cols-12 items-center py-3 px-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div class="col-span-3 text-sm">
              {{ formatDate(transaction.date) }}
            </div>
            <div class="col-span-3 text-sm">
              <div class="font-medium">{{ transaction.description }}</div>
              <div class="text-xs text-gray-500">{{ transaction.merchant }}</div>
            </div>
            <div class="col-span-2 text-sm">
              <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">{{ transaction.type }}</span>
            </div>
            <div class="col-span-2 text-sm">
              <span :class="statusClass(transaction.status)">{{ transaction.status }}</span>
            </div>
            <div class="col-span-2 text-right font-medium"
              :class="transaction.amount > 0 ? 'text-green-600' : 'text-red-600'">
              {{ transaction.amount > 0 ? '+' : '' }}{{ formatCurrency(transaction.amount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useAccountStore } from '@/stores/accountStore';
import TransactionFilters from './TransactionFilters.vue';

const accountStore = useAccountStore();

// 从store获取状态
const currentAccount = computed(() => accountStore.currentAccount);
const filteredTransactions = computed(() => accountStore.filteredTransactions);
const searchFilters = computed(() => accountStore.searchFilters);
const accountTypes = computed(() => accountStore.accountTypes);
const transactionTypes = computed(() => accountStore.transactionTypes);
const statusOptions = computed(() => accountStore.statusOptions);
const isLoading = computed(() => accountStore.isLoading);
const error = computed(() => accountStore.error);

// 方法
const selectAccount = (accountId) => {
  accountStore.selectAccount(accountId);
};

const updateFilters = (filters) => {
  accountStore.updateFilters(filters);
};

const clearFilters = () => {
  accountStore.clearFilters();
};

const formatCurrency = (amount) => {
  if (!amount) return '¥0.00';
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const statusClass = (status) => {
  const classes = {
    '成功': 'text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs',
    '处理中': 'text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs',
    '失败': 'text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs'
  };
  return classes[status] || 'text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs';
};

// 初始化 - 选择第一个账户
watch(
  () => accountStore.userInfo.accounts.length,
  (newLength) => {
    if (newLength > 0 && !currentAccount.value) {
      selectAccount(accountStore.userInfo.accounts[0].id);
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.account-tabs-container {
  height: calc(100vh - 240px);
  min-height: 400px;
}

/* 滚动条样式优化 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>