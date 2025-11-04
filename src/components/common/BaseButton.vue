<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || isLoading"
    @click="handleClick"
    :type="type"
  >
    <span v-if="isLoading" class="mr-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
    <slot />
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  }
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary',
    success: 'bg-success text-white hover:bg-success/90 focus:ring-success',
    info: 'bg-info text-white hover:bg-info/90 focus:ring-info',
    warning: 'bg-warning text-white hover:bg-warning/90 focus:ring-warning',
    danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger',
    text: 'bg-transparent hover:bg-gray-100 text-gray-800 focus:ring-gray-500'
  }
  const disabledClasses = props.disabled || props.isLoading ? 'opacity-50 cursor-not-allowed' : ''
  const widthClass = props.fullWidth ? 'w-full' : ''

  return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]} ${disabledClasses} ${widthClass}`
})
</script>