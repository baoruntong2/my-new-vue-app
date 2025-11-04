<template>
  <div class="transaction-filters bg-white p-4 border-b border-gray-200 shadow-sm sticky top-0 z-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- 时间范围选择器 -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
        <div class="flex items-center space-x-2">
          <input
            type="date"
            v-model="localFilters.dateRange[0]"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            @change="handleFilterChange('dateRange', [localFilters.dateRange[0], localFilters.dateRange[1]])"
          >
          <span class="text-gray-500">至</span>
          <input
            type="date"
            v-model="localFilters.dateRange[1]"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            @change="handleFilterChange('dateRange', [localFilters.dateRange[0], localFilters.dateRange[1]])"
          >
        </div>
      </div>

      <!-- 交易类型下拉菜单 -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">交易类型</label>
        <select
          v-model="localFilters.transactionType"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
          @change="handleFilterChange('transactionType', $event.target.value)"
        >
          <option value="">全部类型</option>
          <option v-for="type in transactionTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <!-- 金额范围输入框 -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">金额范围</label>
        <div class="flex items-center space-x-2">
          <input
            type="number"
            v-model="localFilters.amountRange[0]"
            placeholder="最小金额"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            @change="handleFilterChange('amountRange', [localFilters.amountRange[0], localFilters.amountRange[1]])"
          >
          <span class="text-gray-500">至</span>
          <input
            type="number"
            v-model="localFilters.amountRange[1]"
            placeholder="最大金额"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            @change="handleFilterChange('amountRange', [localFilters.amountRange[0], localFilters.amountRange[1]])"
          >
        </div>
      </div>

      <!-- 交易状态筛选 -->
      <div class="filter-group">
        <label class="block text-sm font-medium text-gray-700 mb-1">交易状态</label>
        <div class="flex items-center space-x-2">
          <select
            v-model="localFilters.status"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
            @change="handleFilterChange('status', $event.target.value)"
          >
            <option value="">全部状态</option>
            <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
          <button
            @click="clearFilters"
            class="text-sm text-gray-500 hover:text-gray-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// 定义props
const props = defineProps({
  transactionTypes: {
    type: Array,
    required: true
  },
  statusOptions: {
    type: Array,
    required: true
  },
  filters: {
    type: Object,
    required: true
  }
});

// 定义emits
const emit = defineEmits(['update-filters', 'clear-filters']);

// 本地过滤器状态
const localFilters = ref({
  dateRange: [],
  transactionType: '',
  amountRange: [],
  status: ''
});

// 监听props.filters变化，同步到本地状态
watch(
  () => props.filters,
  (newFilters) => {
    localFilters.value = { ...newFilters };
  },
  { immediate: true, deep: true }
);

// 处理筛选条件变化
const handleFilterChange = (filterKey, value) => {
  localFilters.value[filterKey] = value;
  emit('update-filters', { ...localFilters.value });
};

// 清除筛选条件
const clearFilters = () => {
  localFilters.value = {
    dateRange: [],
    transactionType: '',
    amountRange: [],
    status: ''
  };
  emit('clear-filters');
};
</script>

<style scoped>
.transaction-filters {
  animation: slideDown 0.3s ease-out;
}

.filter-group {
  transition: all 0.2s ease;
}

@keyframes slideDown {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>