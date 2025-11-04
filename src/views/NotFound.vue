<template>
  <div class="flex flex-col items-center justify-center h-full text-center p-4">
    <div class="w-48 h-48 bg-danger/10 rounded-full flex items-center justify-center mb-8">
      <svg class="w-24 h-24 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <h1 class="text-5xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8 max-w-md">
      抱歉，您访问的页面不存在或已被移除
    </p>
    <router-link
      to="/"
      class="btn-primary inline-flex items-center"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
      </svg>
      返回首页
    </router-link>
  </div>
</template>

<script setup>
// 404页面逻辑
</script>