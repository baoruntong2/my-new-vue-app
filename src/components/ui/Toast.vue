<template>
  <div v-if="show" class="toast-container" :class="positionClass">
    <div class="toast" :class="typeClass" @mouseenter="clearTimer" @mouseleave="startTimer">
      <div v-if="type === 'success'" class="icon success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div v-if="type === 'error'" class="icon error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <div v-if="type === 'info'" class="icon info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <div class="content">{{ message }}</div>
      <button class="close-btn" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 定义props
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  },
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
  },
  show: {
    type: Boolean,
    default: false
  }
});

// 定义emits
const emit = defineEmits(['close']);

// 定时器
let timer = null;

// 计算样式类
const typeClass = computed(() => {
  return `toast-${props.type}`;
});

const positionClass = computed(() => {
  return `toast-${props.position}`;
});

// 开始定时器
const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      emit('close');
    }, props.duration);
  }
};

// 清除定时器
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

// 关闭toast
const close = () => {
  clearTimer();
  emit('close');
};

// 生命周期钩子
onMounted(() => {
  if (props.show) {
    startTimer();
  }
});

onUnmounted(() => {
  clearTimer();
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 9999;
  margin: 16px;
}

.toast-top-right {
  top: 0;
  right: 0;
}

.toast-top-left {
  top: 0;
  left: 0;
}

.toast-bottom-right {
  bottom: 0;
  right: 0;
}

.toast-bottom-left {
  bottom: 0;
  left: 0;
}

.toast {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 500px;
  animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(50px); }
}

.toast-success {
  border-left: 4px solid #52c41a;
}

.toast-error {
  border-left: 4px solid #ff4d4f;
}

.toast-info {
  border-left: 4px solid #1890ff;
}

.toast-warning {
  border-left: 4px solid #faad14;
}

.icon {
  margin-right: 12px;
  flex-shrink: 0;
}

.success-icon {
  color: #52c41a;
}

.error-icon {
  color: #ff4d4f;
}

.info-icon {
  color: #1890ff;
}

.warning-icon {
  color: #faad14;
}

.content {
  flex: 1;
  word-break: break-all;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  margin-left: 8px;
  color: #ccc;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #666;
}
</style>