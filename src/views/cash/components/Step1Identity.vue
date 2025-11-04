<template>
  <div class="identity-verification-container space-y-6">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-900">身份验证</h2>
      <p class="mt-2 text-sm text-gray-500">请完成身份验证以继续预约流程</p>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <svg class="animate-spin -ml-1 mr-2 h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-500">验证中...</p>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div class="flex">
        <svg class="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-red-800">验证失败</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ errorMessage }}</p>
            <button @click="initVerification" class="text-primary hover:underline ml-2">重试</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 已登录用户 -->
    <div v-else-if="userInfo.isLoggedIn" class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div class="mb-4">
        <svg class="w-12 h-12 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-green-800 mb-2">
        欢迎您，{{ userInfo.name }}{{ getUserTitle() }}
      </h3>
      <p class="mt-2 text-sm text-green-700">身份信息已验证，正在为您准备预约表单...</p>
      <div class="mt-4 pt-4 border-t border-green-200">
        <p class="text-xs text-green-600">
          <span class="font-medium">姓名：</span>{{ userInfo.name }} | 
          <span class="font-medium">身份证号：</span>{{ maskIdCard(userInfo.idCard) }} | 
          <span class="font-medium">客户号：</span>{{ userInfo.customerId || '未设置' }}
        </p>
      </div>
    </div>

    <!-- 未登录用户 - 访客预约 -->
    <div v-else class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">访客预约</h3>
        <p class="text-sm text-gray-500">请填写以下信息进行身份验证</p>
      </div>

      <form @submit.prevent="handleVerify" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-1">
            <label for="visitorName" class="block text-sm font-medium text-gray-700">
              姓名 <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="visitorName"
              v-model="visitorForm.name"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="请输入真实姓名"
              maxlength="20"
            >
          </div>

          <div class="space-y-1">
            <label for="visitorIdCard" class="block text-sm font-medium text-gray-700">
              身份证号 <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="visitorIdCard"
              v-model="visitorForm.idCard"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="请输入18位身份证号"
              maxlength="18"
              @input="validateIdCard"
            >
            <p v-if="idCardError" class="text-xs text-red-500 mt-1">{{ idCardError }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-1">
            <label for="visitorPhone" class="block text-sm font-medium text-gray-700">
              手机号码 <span class="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="visitorPhone"
              v-model="visitorForm.phone"
              required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="请输入银行预留手机号"
              maxlength="11"
              @input="validatePhone"
            >
            <p v-if="phoneError" class="text-xs text-red-500 mt-1">{{ phoneError }}</p>
          </div>

          <div class="space-y-1">
            <label for="verifyCode" class="block text-sm font-medium text-gray-700">
              短信验证码 <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-3">
              <input
                type="text"
                id="verifyCode"
                v-model="visitorForm.verifyCode"
                required
                class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="请输入6位验证码"
                maxlength="6"
              >
              <button
                type="button"
                @click="sendVerifyCode"
                :disabled="isSendingCode || !visitorForm.phone || phoneError"
                class="px-6 py-2.5 whitespace-nowrap bg-primary text-white rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {{ isSendingCode ? `${countdown}秒后重发` : '获取验证码' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 测试账户提示 -->
        <div v-if="isTestAccount" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="text-sm text-blue-700">
              <p class="font-medium">测试账户模式</p>
              <p class="mt-1">您正在使用内部测试账户，验证码为：<span class="font-mono font-bold">{{ testVerifyCode }}</span></p>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="isVerifying"
            class="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-base"
          >
            <span v-if="isVerifying" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              验证中...
            </span>
            <span v-else>验证并继续</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { verifyIdCard, verifyPhone } from '@/utils/validators';
import { sendSmsCode, verifyVisitor } from '@/api/appointment';
import { maskIdCard } from '@/utils/formatters';

const appointmentStore = useAppointmentStore();
const emit = defineEmits(['verified', 'next']);
const notification = inject('notification');

// 测试账户配置
const TEST_ACCOUNTS = {
  'test001': {
    name: '张三',
    idCard: '110101199001011234',
    phone: '13800138000',
    verifyCode: '123456',
    customerId: 'TEST_USER_001'
  },
  'test002': {
    name: '李四',
    idCard: '110101199002022345',
    phone: '13900139000',
    verifyCode: '654321',
    customerId: 'TEST_USER_002'
  }
};

// 状态变量
const isLoading = ref(true);
const errorMessage = ref('');
const userInfo = ref({ ...appointmentStore.userInfo });
const visitorForm = reactive({
  name: '',
  idCard: '',
  phone: '',
  verifyCode: ''
});
const isSendingCode = ref(false);
const countdown = ref(60);
const isVerifying = ref(false);
const idCardError = ref('');
const phoneError = ref('');
const testVerifyCode = ref('');
const isTestAccount = ref(false);

// 初始化验证流程
const initVerification = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    // 检查用户登录状态
    const loggedInUser = await appointmentStore.checkLoginStatus();
    if (loggedInUser) {
      userInfo.value = loggedInUser;
      appointmentStore.setUserInfo(loggedInUser);
      // 显示欢迎信息后自动进入下一步
      setTimeout(() => {
        emit('verified');
        emit('next');
      }, 2000);
    }
  } catch (error) {
    console.error('身份验证初始化失败:', error);
    errorMessage.value = '身份验证初始化失败，请重试';
  } finally {
    isLoading.value = false;
  }
};

// 验证身份证号
const validateIdCard = (e) => {
  const value = e.target.value;
  if (value) {
    const result = verifyIdCard(value);
    idCardError.value = result.valid ? '' : result.message;
    // 检查测试账户
    if (result.valid && visitorForm.phone) {
      checkTestAccount();
    }
  } else {
    idCardError.value = '';
    isTestAccount.value = false;
  }
};

// 验证手机号
const validatePhone = (e) => {
  const value = e.target.value;
  if (value) {
    // 传入身份证号以便验证测试账户
    const result = verifyPhone(value, visitorForm.idCard);
    phoneError.value = result.valid ? '' : result.message;
    // 检查测试账户（如果手机号和身份证号都有效）
    if (result.valid && visitorForm.idCard) {
      checkTestAccount();
    }
  } else {
    phoneError.value = '';
    isTestAccount.value = false;
  }
};

// 检查是否为测试账户
const checkTestAccount = () => {
  const testAccount = Object.values(TEST_ACCOUNTS).find(
    account => account.idCard === visitorForm.idCard && account.phone === visitorForm.phone
  );
  if (testAccount) {
    isTestAccount.value = true;
    testVerifyCode.value = testAccount.verifyCode;
    // 自动填充验证码
    visitorForm.verifyCode = testAccount.verifyCode;
    return true;
  }
  isTestAccount.value = false;
  return false;
};

// 发送验证码
const sendVerifyCode = async () => {
  const phoneResult = verifyPhone(visitorForm.phone, visitorForm.idCard);
  if (!phoneResult.valid) {
    phoneError.value = phoneResult.message;
    return;
  }

  // 检查测试账户
  const isTest = checkTestAccount();
  
  try {
    isSendingCode.value = true;
    
    // 如果是测试账户，直接返回测试验证码
    if (isTest) {
      notification?.success('测试账户：验证码已自动填充');
      isSendingCode.value = false;
      return;
    }
    
    const result = await sendSmsCode(visitorForm.phone);
    if (result.success) {
      notification?.success('验证码已发送，请查收短信');
      // 启动倒计时
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
          isSendingCode.value = false;
          countdown.value = 60;
        }
      }, 1000);
    } else {
      notification?.error(result.message || '发送验证码失败，请重试');
      isSendingCode.value = false;
    }
  } catch (error) {
    console.error('发送验证码失败:', error);
    notification?.error('发送验证码失败，请稍后重试');
    isSendingCode.value = false;
  }
};

// 处理访客验证
const handleVerify = async () => {
  // 表单验证
  if (!visitorForm.name || visitorForm.name.trim().length === 0) {
    notification?.error('请输入姓名');
    return;
  }

  const idCardResult = verifyIdCard(visitorForm.idCard);
  if (!idCardResult.valid) {
    idCardError.value = idCardResult.message;
    notification?.error(idCardResult.message);
    return;
  }

  const phoneResult = verifyPhone(visitorForm.phone, visitorForm.idCard);
  if (!phoneResult.valid) {
    phoneError.value = phoneResult.message;
    notification?.error(phoneResult.message);
    return;
  }

  if (!visitorForm.verifyCode || visitorForm.verifyCode.length === 0) {
    notification?.error('请输入验证码');
    return;
  }

  try {
    isVerifying.value = true;
    
    // 检查是否为测试账户
    const testAccount = Object.values(TEST_ACCOUNTS).find(
      account => account.idCard === visitorForm.idCard && 
                 account.phone === visitorForm.phone &&
                 account.verifyCode === visitorForm.verifyCode
    );
    
    let result;
    if (testAccount) {
      // 测试账户直接通过验证
      result = {
        success: true,
        message: '身份验证成功（测试账户）',
        data: {
          customerId: testAccount.customerId,
          name: testAccount.name,
          idCard: testAccount.idCard,
          phone: testAccount.phone,
          token: 'TEST_TOKEN_' + Date.now()
        }
      };
    } else {
      // 普通账户调用API验证
      result = await verifyVisitor(visitorForm);
    }
    
    if (result.success) {
      // 保存访客信息
      appointmentStore.setUserInfo({
        name: result.data.name || visitorForm.name,
        idCard: result.data.idCard || visitorForm.idCard,
        phone: result.data.phone || visitorForm.phone,
        isLoggedIn: false,
        customerId: result.data.customerId
      });
      
      notification?.success('身份验证成功');
      setTimeout(() => {
        emit('verified');
        emit('next');
      }, 500);
    } else {
      errorMessage.value = result.message || '身份验证失败，请检查信息后重试';
      notification?.error(errorMessage.value);
    }
  } catch (error) {
    console.error('访客验证失败:', error);
    errorMessage.value = error.message || '验证过程中发生错误，请稍后重试';
    notification?.error(errorMessage.value);
  } finally {
    isVerifying.value = false;
  }
};

// 获取用户称谓
const getUserTitle = () => {
  if (userInfo.value.gender === 'male') {
    return '先生';
  } else if (userInfo.value.gender === 'female') {
    return '女士';
  }
  // 如果没有性别信息，根据姓名判断（简单判断）
  const name = userInfo.value.name || '';
  // 这里可以根据实际需求添加更智能的判断逻辑
  return '';
};

// 页面加载时初始化
onMounted(() => {
  initVerification();
});
</script>

<style scoped>
.identity-verification-container {
  max-width: 600px;
  margin: 0 auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.bg-green-50 {
  animation: fadeIn 0.5s ease-out;
}
</style>