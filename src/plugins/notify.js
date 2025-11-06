// 简单的通知插件
import { createApp, h } from 'vue'
import Toast from '@/components/ui/Toast.vue'

let container = null

const createContainer = () => {
  if (container) return container
  
  container = document.createElement('div')
  container.id = 'notify-container'
  container.style.cssText = 'position: fixed; top: 0; right: 0; z-index: 9999; pointer-events: none; padding: 16px;'
  document.body.appendChild(container)
  
  return container
}

const showNotification = (message, type = 'info', options = {}) => {
  const { title, duration = 3000 } = options
  const container = createContainer()
  
  const notificationDiv = document.createElement('div')
  notificationDiv.style.cssText = 'pointer-events: auto; margin-bottom: 8px;'
  container.appendChild(notificationDiv)
  
  let isVisible = true
  
  const close = () => {
    isVisible = false
    setTimeout(() => {
      if (app && notificationDiv.parentNode) {
        app.unmount()
        notificationDiv.remove()
      }
    }, 300)
  }
  
  const app = createApp({
    data() {
      return {
        show: true
      }
    },
    methods: {
      handleClose() {
        this.show = false
        close()
      }
    },
    render() {
      return h(Toast, {
        message: title ? `${title}: ${message}` : message,
        type,
        duration,
        show: this.show,
        onClose: this.handleClose
      })
    }
  })
  
  app.mount(notificationDiv)
  
  if (duration > 0) {
    setTimeout(() => {
      close()
    }, duration)
  }
  
  return { close }
}

const notify = {
  success: (message, options = {}) => showNotification(message, 'success', options),
  error: (message, options = {}) => showNotification(message, 'error', options),
  warning: (message, options = {}) => showNotification(message, 'warning', options),
  info: (message, options = {}) => showNotification(message, 'info', options)
}

export default notify
