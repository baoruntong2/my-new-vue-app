<template>
  <div class="cash-appointment-container">
    <h1 class="text-2xl font-bold mb-6">现金业务预约</h1>
    <div class="steps-container">
      <div class="steps-indicator">
        <div class="step-item" :class="currentStep >= 1 ? 'active' : ''">
          <div class="step-number">1</div>
          <div class="step-name">身份验证</div>
        </div>
        <div class="step-item" :class="currentStep >= 2 ? 'active' : ''">
          <div class="step-number">2</div>
          <div class="step-name">业务信息</div>
        </div>
        <div class="step-item" :class="currentStep >= 3 ? 'active' : ''">
          <div class="step-number">3</div>
          <div class="step-name">网点与时间</div>
        </div>
        <div class="step-item" :class="currentStep >= 4 ? 'active' : ''">
          <div class="step-number">4</div>
          <div class="step-name">确认提交</div>
        </div>
        <div class="step-item" :class="currentStep >= 5 ? 'active' : ''">
          <div class="step-number">5</div>
          <div class="step-name">预约成功</div>
        </div>
      </div>

      <!-- 步骤内容 -->
      <div class="step-content">
        <Step1Identity
          v-if="currentStep === 1"
          @next="handleNext"
          @error="handleError"
        />

        <Step2Business
          v-if="currentStep === 2"
          @next="handleNext"
          @prev="handleBack"
        />

        <Step3BranchTime
          v-if="currentStep === 3"
          @next="handleNext"
          @prev="handleBack"
        />

        <Step4Confirmation
          v-if="currentStep === 4"
          @confirmed="handleSubmit"
          @back="handleBack"
        />

        <Step5Success
          v-if="currentStep === 5"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAppointmentStore } from '@/stores/appointmentStore';
import Step1Identity from './components/Step1Identity.vue';
import Step2Business from './components/Step2Business.vue';
import Step3BranchTime from './components/Step3BranchTime.vue';
import Step4Confirmation from './components/Step4Confirmation.vue';
import Step5Success from './components/Step5Success.vue';
import { useRouter } from 'vue-router';

const appointmentStore = useAppointmentStore();
const router = useRouter();
const currentStep = ref(1);
  const totalSteps = 5;
  const isLoading = ref(true);
  const errorMessage = ref('');
const isSubmitting = ref(false);

// 初始化预约流程
const initAppointment = async () => {
  try {
    isLoading.value = true;
    // 检查用户登录状态
    const userInfo = await appointmentStore.checkUserStatus();
    // 如果用户已登录且已完成身份验证，直接进入业务信息步骤
    if (userInfo.isLoggedIn) {
      currentStep.value = 2;
    }
    errorMessage.value = '';
  } catch (error) {
    console.error('初始化预约流程失败:', error);
    errorMessage.value = '预约流程初始化失败，请刷新页面重试';
  } finally {
    isLoading.value = false;
  }
};

// 步骤导航
const goToStep = (step) => {
  currentStep.value = step;
  window.scrollTo(0, 0);
};

// 处理下一步
const handleNext = () => {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    isSubmitting.value = true;
    try {
      // 提交预约后跳转到成功页面
      currentStep.value = 5;
      // 模拟发送预约成功通知
      setTimeout(() => {
        window.$notify?.success('预约成功，已发送短信通知');
      }, 1000);
    } catch (error) {
      console.error('预约提交失败:', error);
      window.$notify?.error('预约提交失败，请稍后重试');
    } finally {
      isSubmitting.value = false;
    }
  };

  const handleError = (error) => {
    console.error('步骤错误:', error);
    errorMessage.value = error.message || '操作失败，请稍后重试';
    window.$notify?.error({
      title: '错误',
      message: errorMessage.value,
      duration: 5000
    });
  };

  // 监听步骤变化，保存当前步骤到store
  watch(currentStep, (newStep) => {
    appointmentStore.setCurrentStep(newStep);
    // 更新步骤进度条
    const progress = ((newStep - 1) / (totalSteps - 1)) * 100;
    document.documentElement.style.setProperty('--progress', `${progress}%`);
  }, { immediate: true });

onMounted(() => {
  initAppointment();
});
</script>

<style scoped>
.cash-appointment-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.steps-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 32px;
  padding: 0 20px;
}

.steps-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 60px;
  right: 60px;
  height: 3px;
  background: linear-gradient(to right, #3b82f6 0%, #3b82f6 var(--progress, 0%), #e5e7eb var(--progress, 0%), #e5e7eb 100%);
  z-index: 1;
  transition: all 0.3s ease;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;
  min-width: 0;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 3px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #9ca3af;
  transition: all 0.3s ease;
  margin-bottom: 8px;
}

.step-item.active .step-number {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.step-name {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.step-item.active .step-name {
  color: #3b82f6;
  font-weight: 500;
}

.step-content {
  min-height: 400px;
  padding: 20px 0;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .steps-indicator {
    padding: 0 10px;
  }
  
  .steps-indicator::before {
    left: 40px;
    right: 40px;
  }
  
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .step-name {
    font-size: 11px;
  }
  
  .cash-appointment-container {
    padding: 16px;
  }
}
</style>