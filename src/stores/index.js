import { createPinia } from 'pinia'
import cashStore from './cashStore'
import nonCashStore from './nonCashStore'

const pinia = createPinia()

export { cashStore, nonCashStore }
export default pinia