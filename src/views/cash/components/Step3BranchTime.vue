<template>
  <div class="branch-time-container space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">选择线下营业厅与时间</h2>
      <p class="mt-2 text-sm text-gray-500">请选择办理网点及预约时间</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="animate-spin -ml-1 mr-2 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500">加载网点信息中...</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="loadError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex">
        <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">加载失败</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ loadError }}</p>
            <button @click="loadBranches" class="text-primary hover:underline ml-2">重试</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 网点选择 -->
    <div v-else class="space-y-4">
      <!-- 网点列表 -->
      <div class="border rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-700 mb-4">选择网点</h3>
        <div class="space-y-3">
          <div
            v-for="branch in branches"
            :key="branch.id"
            @click="selectBranch(branch)"
            :class="[
              'border rounded-lg p-4 cursor-pointer transition-all',
              selectedBranch?.id === branch.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            ]"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h4 class="font-medium text-gray-900">{{ branch.name }}</h4>
                  <span v-if="branch.largeCashSupport" class="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                    支持大额
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-1">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ branch.address }}
                </p>
                <p class="text-sm text-gray-600 mb-1">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  电话：{{ branch.phone }}
                </p>
                <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    今日排队：{{ branch.queueCount }}人
                  </span>
                  <span v-if="branch.distance > 0">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    距离：{{ branch.distance }}km
                  </span>
                </div>
                <div class="mt-2 text-xs text-gray-500">
                  <p class="font-medium mb-1">营业时间：</p>
                  <p>{{ branch.businessHours }}</p>
                </div>
              </div>
              <div v-if="selectedBranch?.id === branch.id" class="ml-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 日期选择 -->
      <div v-if="selectedBranch" class="border rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-700 mb-4">选择办理日期</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="date in availableDates"
            :key="date.value"
            @click="selectDate(date.value)"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              selectedDate === date.value
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              date.disabled ? 'opacity-50 cursor-not-allowed' : ''
            ]"
            :disabled="date.disabled"
          >
            <div>{{ date.label }}</div>
            <div class="text-xs mt-1">{{ date.dateStr }}</div>
          </button>
        </div>
      </div>

      <!-- 时间段选择 -->
      <div v-if="selectedBranch && selectedDate" class="border rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-700 mb-4">选择时间段</h3>
        <div v-if="loadingTimeSlots" class="text-center py-4">
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-primary inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-gray-500">加载可用时段...</span>
        </div>
        <div v-else-if="timeSlots.length === 0" class="text-center py-4 text-gray-500">
          该日期暂无可用时段
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="slot in timeSlots"
            :key="slot.value"
            @click="selectTimeSlot(slot.value)"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              selectedTimeSlot === slot.value
                ? 'bg-primary text-white shadow-md'
                : slot.available
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed opacity-50'
            ]"
            :disabled="!slot.available"
          >
            {{ slot.label }}
          </button>
        </div>
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
        :disabled="!selectedBranch || !selectedDate || !selectedTimeSlot"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        下一步：确认预约信息
        <svg class="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useAppointmentStore } from '@/stores/appointmentStore';
import appointmentService from '@/services/appointmentService';

const appointmentStore = useAppointmentStore();
const emit = defineEmits(['prev', 'next']);

// 状态变量
const isLoading = ref(false);
const loadError = ref('');
const branches = ref([]);
const selectedBranch = ref(null);
const selectedDate = ref('');
const selectedTimeSlot = ref('');
const timeSlots = ref([]);
const loadingTimeSlots = ref(false);

// 生成未来7天的日期选项
const availableDates = computed(() => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${month}-${day}`;
    const value = `${date.getFullYear()}-${month}-${day}`;
    
    dates.push({
      label: i === 0 ? '今天' : i === 1 ? '明天' : weekday,
      dateStr,
      value,
      disabled: false
    });
  }
  
  return dates;
});

// 加载网点列表
const loadBranches = async () => {
  try {
    isLoading.value = true;
    loadError.value = '';
    
    // 模拟API调用，实际应该从 appointmentService 获取
    // const data = await appointmentService.getBranches({ city: 'hebei' });
    
    // 模拟数据 - 河北银行网点
    const mockBranches = [
      {
        id: 'branch_001',
        name: '河北银行总行营业部',
        address: '河北省石家庄市长安区中山东路216号',
        phone: '0311-88888888',
        distance: 2.5,
        queueCount: 15,
        businessHours: '周一至周五 09:00-17:00，周六 09:00-12:00',
        largeCashSupport: true,
        newNotesSupport: true
      },
      {
        id: 'branch_002',
        name: '河北银行城东支行',
        address: '河北省石家庄市裕华区建华南大街88号',
        phone: '0311-88888889',
        distance: 5.2,
        queueCount: 8,
        businessHours: '周一至周五 09:00-17:00，周六 09:00-12:00',
        largeCashSupport: true,
        newNotesSupport: false
      },
      {
        id: 'branch_003',
        name: '河北银行城西支行',
        address: '河北省石家庄市桥西区中山西路188号',
        phone: '0311-88888890',
        distance: 3.8,
        queueCount: 12,
        businessHours: '周一至周五 09:00-17:00，周六 09:00-12:00',
        largeCashSupport: false,
        newNotesSupport: false
      },
      {
        id: 'branch_004',
        name: '河北银行城南支行',
        address: '河北省石家庄市桥西区新石中路266号',
        phone: '0311-88888891',
        distance: 6.5,
        queueCount: 5,
        businessHours: '周一至周五 09:00-17:00',
        largeCashSupport: true,
        newNotesSupport: false
      },
      {
        id: 'branch_005',
        name: '河北银行城北支行',
        address: '河北省石家庄市新华区和平西路298号',
        phone: '0311-88888892',
        distance: 4.3,
        queueCount: 10,
        businessHours: '周一至周五 09:00-17:00，周六 09:00-12:00',
        largeCashSupport: false,
        newNotesSupport: false
      }
    ];
    
    branches.value = mockBranches;
    
    // 如果store中已有选中的网点，恢复选择
    if (appointmentStore.branchInfo.id) {
      const savedBranch = branches.value.find(b => b.id === appointmentStore.branchInfo.id);
      if (savedBranch) {
        selectedBranch.value = savedBranch;
      }
    }
    
    if (appointmentStore.appointmentDate) {
      selectedDate.value = appointmentStore.appointmentDate;
    }
    
    if (appointmentStore.appointmentTime) {
      selectedTimeSlot.value = appointmentStore.appointmentTime;
    }
  } catch (error) {
    console.error('加载网点列表失败:', error);
    loadError.value = '获取网点信息失败，请刷新页面重试';
  } finally {
    isLoading.value = false;
  }
};

// 选择网点
const selectBranch = (branch) => {
  selectedBranch.value = branch;
  appointmentStore.setBranchInfo(branch);
  // 清空已选的时间和日期，重新选择
  selectedDate.value = '';
  selectedTimeSlot.value = '';
  timeSlots.value = [];
};

// 选择日期
const selectDate = (date) => {
  selectedDate.value = date;
  appointmentStore.setAppointmentDate(date);
  // 清空已选的时间段，重新加载
  selectedTimeSlot.value = '';
  loadTimeSlots();
};

// 加载时间段
const loadTimeSlots = async () => {
  if (!selectedBranch.value || !selectedDate.value) return;
  
  try {
    loadingTimeSlots.value = true;
    
    // 模拟API调用
    // const data = await appointmentService.getAvailableTimeSlots(selectedBranch.value.id, selectedDate.value);
    
    // 模拟时间段数据（30分钟间隔）
    const allSlots = [
      { value: '09:00-09:30', label: '09:00-09:30', available: true },
      { value: '09:30-10:00', label: '09:30-10:00', available: true },
      { value: '10:00-10:30', label: '10:00-10:30', available: true },
      { value: '10:30-11:00', label: '10:30-11:00', available: true },
      { value: '11:00-11:30', label: '11:00-11:30', available: true },
      { value: '11:30-12:00', label: '11:30-12:00', available: true },
      { value: '14:00-14:30', label: '14:00-14:30', available: true },
      { value: '14:30-15:00', label: '14:30-15:00', available: true },
      { value: '15:00-15:30', label: '15:00-15:30', available: true },
      { value: '15:30-16:00', label: '15:30-16:00', available: true },
      { value: '16:00-16:30', label: '16:00-16:30', available: true },
      { value: '16:30-17:00', label: '16:30-17:00', available: true }
    ];
    
    // 模拟部分时段已约满
    const unavailableCount = Math.floor(Math.random() * 3);
    for (let i = 0; i < unavailableCount; i++) {
      const randomIndex = Math.floor(Math.random() * allSlots.length);
      allSlots[randomIndex].available = false;
    }
    
    timeSlots.value = allSlots;
    
    // 如果store中已有选中的时间段，恢复选择
    if (appointmentStore.appointmentTime) {
      const savedSlot = timeSlots.value.find(s => s.value === appointmentStore.appointmentTime);
      if (savedSlot && savedSlot.available) {
        selectedTimeSlot.value = savedSlot.value;
      }
    }
  } catch (error) {
    console.error('加载时间段失败:', error);
    window.$notify?.error('获取可用时段失败，请稍后重试');
  } finally {
    loadingTimeSlots.value = false;
  }
};

// 选择时间段
const selectTimeSlot = (time) => {
  selectedTimeSlot.value = time;
  appointmentStore.setAppointmentTime(time);
};

// 下一步
const handleNext = () => {
  if (!selectedBranch.value || !selectedDate.value || !selectedTimeSlot.value) {
    window.$notify?.error('请完整选择网点、日期和时间段');
    return;
  }
  
  emit('next');
};

// 监听日期变化，自动加载时间段
watch([selectedBranch, selectedDate], () => {
  if (selectedBranch.value && selectedDate.value) {
    loadTimeSlots();
  }
});

// 页面加载时初始化
onMounted(() => {
  loadBranches();
});
</script>

<style scoped>
.branch-time-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>

