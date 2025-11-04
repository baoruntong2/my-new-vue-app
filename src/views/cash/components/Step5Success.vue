<template>
  <div class="success-container text-center py-8 px-4">
    <!-- 成功状态图标 -->
    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>

    <!-- 标题和提示 -->
    <h2 class="text-2xl font-bold text-gray-900 mb-2">预约成功</h2>
    <p class="text-gray-500 mb-4">您的{{ businessTypeName }}预约已提交成功，请凭预约码到店办理</p>
    <p class="text-sm text-gray-400 mb-8">系统已发送预约成功通知，请注意查收短信</p>

    <!-- 预约码和二维码 -->
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- 二维码 -->
        <div class="bg-white p-2 border rounded-md">
          <qrcode-vue
            :value="appointmentQrCodeValue"
            :size="120"
            level="H"
            class="qrcode"
          ></qrcode-vue>
        </div>

        <!-- 预约信息 -->
        <div class="text-left">
          <div class="mb-3">
            <p class="text-sm text-gray-500">预约编号</p>
            <p class="text-lg font-semibold text-primary">{{ appointmentNo }}</p>
          </div>
          <div class="space-y-1 text-sm">
            <p class="flex justify-between"><span class="text-gray-500">业务类型：</span> <span class="font-medium">{{ businessTypeName }}</span></p>
            <p class="flex justify-between"><span class="text-gray-500">预约日期：</span> <span class="font-medium">{{ formatDate(appointmentDate) }}</span></p>
            <p class="flex justify-between"><span class="text-gray-500">预约时段：</span> <span class="font-medium">{{ appointmentTime }}</span></p>
            <p class="flex justify-between"><span class="text-gray-500">办理网点：</span> <span class="font-medium">{{ branchName }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <button
        class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="handleAddToCalendar"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        添加到手机日历
      </button>
      <button
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="handlePrint"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        打印凭证
      </button>
    </div>

    <!-- 温馨提示 -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
      <h3 class="text-sm font-medium text-blue-800 mb-2">温馨提示</h3>
      <ul class="text-sm text-blue-700 space-y-1">
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>请务必携带本人有效身份证件及银行卡前往办理</span>
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>如需取消预约，请提前2小时通过原预约渠道操作</span>
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>预约码有效期为预约日期当天，请按时前往办理</span>
        </li>
        <li class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>系统将在预约时间前1-2小时发送提醒短信</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { formatDate } from '@/utils/formatters';
import QrcodeVue from 'qrcode.vue';

const appointmentStore = useAppointmentStore();

// 从store获取数据
const appointmentNo = computed(() => appointmentStore.appointmentNo);
const businessTypeName = computed(() => appointmentStore.businessTypeName);
const appointmentDate = computed(() => appointmentStore.appointmentDate);
const appointmentTime = computed(() => appointmentStore.appointmentTime);
const branchName = computed(() => appointmentStore.branchInfo?.name || '');
const amount = computed(() => appointmentStore.businessInfo?.details?.amount || 0);

// 生成二维码内容
const appointmentQrCodeValue = computed(() => {
  return JSON.stringify({
    type: 'cash_appointment',
    appointmentNo: appointmentNo.value,
    name: appointmentStore.userInfo.name,
    date: appointmentDate.value,
    time: appointmentTime.value,
    branch: branchName.value
  });
});

// 添加到日历
const handleAddToCalendar = () => {
  try {
    // 构建日历事件数据
    const timeStart = appointmentTime.value.split('-')[0];
    const timeEnd = appointmentTime.value.split('-')[1];
    const startDateTime = new Date(`${appointmentDate.value}T${timeStart}`);
    const endDateTime = new Date(`${appointmentDate.value}T${timeEnd}`);
    
    // 生成ICS格式的日历文件
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//河北银行//预约系统//CN',
      'BEGIN:VEVENT',
      `UID:${appointmentNo.value}@hebbank.com`,
      `DTSTART:${formatDateForICS(startDateTime)}`,
      `DTEND:${formatDateForICS(endDateTime)}`,
      `SUMMARY:现金业务预约 - ${businessTypeName.value}`,
      `DESCRIPTION:预约编号: ${appointmentNo.value}\\n业务类型: ${businessTypeName.value}\\n金额: ${amount.value}元\\n网点: ${branchName.value}`,
      `LOCATION:${branchName.value}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    // 创建下载链接
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `预约-${appointmentNo.value}.ics`;
    link.click();
    
    window.$notify?.success('日历文件已下载，请导入到您的日历应用');
  } catch (error) {
    console.error('添加到日历失败:', error);
    window.$notify?.error('添加日历失败，请稍后重试');
  }
};

// 格式化日期为ICS格式
const formatDateForICS = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};

// 打印凭证
const handlePrint = () => {
  window.print();
};
</script>

<style scoped>
.success-container {
  max-width: 600px;
  margin: 0 auto;
}

.qrcode {
  background-color: white;
}
</style>

