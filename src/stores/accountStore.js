import { defineStore } from 'pinia';

// 模拟数据生成工具
const generateAccountNumber = (type) => {
  const prefixes = {
    '银行卡': '6222',
    '信用卡': '4367'
  };
  const prefix = prefixes[type] || '6222';
  const middle = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix} ${middle.slice(0, 4)} ${middle.slice(4, 8)} ${suffix}`;
};

// 模拟交易记录生成
const generateTransactions = (count = 10) => {
  const types = ['存款', '取款', '转账支出', '转账收入', '消费', '还款'];
  const statuses = ['成功', '处理中', '失败'];
  const transactions = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const amount = Math.floor(Math.random() * 10000) + 100;
    const isExpense = Math.random() > 0.4;
    const date = new Date(today);
    date.setDate(today.getDate() - Math.floor(Math.random() * 30));

    transactions.push({
      id: Date.now() + i,
      date: date.toISOString(),
      description: `${types[Math.floor(Math.random() * types.length)]}${isExpense ? '支出' : '收入'}`,
      amount: isExpense ? -amount : amount,
      balance: Math.floor(Math.random() * 100000) + 1000,
      type: types[Math.floor(Math.random() * types.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      merchant: `商户${Math.floor(Math.random() * 1000)}`
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const useAccountStore = defineStore('account', {
  state: () => ({
    userInfo: {
      name: '',
      accountCount: 0,
      accounts: []
    },
    currentAccount: null,
    transactions: [],
    filteredTransactions: [],
    searchFilters: {
      dateRange: [],
      transactionType: '',
      amountRange: [],
      status: ''
    },
    navigationState: {
      from: null,
      to: null,
      timestamp: null
    },
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchUserInfo() {
      this.isLoading = true;
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 800));

        // 生成模拟用户数据
        const accountTypes = ['银行卡', '银行卡', '信用卡'];
        const accounts = accountTypes.map((type, index) => ({
          id: index + 1,
          name: `${type}${index + 1}`,
          type: type,
          number: generateAccountNumber(type),
          balance: Math.floor(Math.random() * 100000) + 5000,
          openDate: new Date(Date.now() - index * 30 * 24 * 60 * 60 * 1000).toISOString(),
          transactions: generateTransactions(15 - index * 3)
        }));

        // 按账户类型分类，同一类型内按开卡时间倒序排列
        accounts.sort((a, b) => {
          if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
          }
          return new Date(b.openDate) - new Date(a.openDate);
        });

        this.userInfo = {
          name: '张三',
          accountCount: accounts.length,
          accounts: accounts
        };

        // 默认选择第一个账户
        if (accounts.length > 0) {
          this.selectAccount(accounts[0].id);
        }
      } catch (err) {
        this.error = '获取用户信息失败，请稍后重试';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    selectAccount(accountId) {
      const account = this.userInfo.accounts.find(acc => acc.id === accountId);
      if (account) {
        this.currentAccount = account;
        this.transactions = [...account.transactions];
        this.filteredTransactions = [...this.transactions];
        this.applyFilters(); // 应用当前筛选条件
      }
    },

    applyFilters() {
      let results = [...this.transactions];

      // 日期范围筛选
      if (this.searchFilters.dateRange.length === 2) {
        const startDate = new Date(this.searchFilters.dateRange[0]);
        const endDate = new Date(this.searchFilters.dateRange[1]);
        endDate.setHours(23, 59, 59, 999);
        results = results.filter(tx => {
          const txDate = new Date(tx.date);
          return txDate >= startDate && txDate <= endDate;
        });
      }

      // 交易类型筛选
      if (this.searchFilters.transactionType) {
        results = results.filter(tx => tx.type === this.searchFilters.transactionType);
      }

      // 金额范围筛选
      if (this.searchFilters.amountRange.length === 2) {
        const minAmount = this.searchFilters.amountRange[0];
        const maxAmount = this.searchFilters.amountRange[1];
        results = results.filter(tx => Math.abs(tx.amount) >= minAmount && Math.abs(tx.amount) <= maxAmount);
      }

      // 状态筛选
      if (this.searchFilters.status) {
        results = results.filter(tx => tx.status === this.searchFilters.status);
      }

      this.filteredTransactions = results;
    },

    updateFilters(filters) {
      this.searchFilters = { ...this.searchFilters, ...filters };
      this.applyFilters();
    },

    clearFilters() {
      this.searchFilters = {
        dateRange: [],
        transactionType: '',
        amountRange: [],
        status: ''
      };
      this.applyFilters();
    },

    clearError() {
      this.error = null;
    },
    
    // 设置导航状态
    setNavigationState(state) {
      this.navigationState = {
        from: state.from,
        to: state.to,
        timestamp: state.timestamp
      };
    },
    
    // 清除导航状态
    clearNavigationState() {
      this.navigationState = {
        from: null,
        to: null,
        timestamp: null
      };
    }
  },

  getters: {
    accountTypes() {
      const types = [...new Set(this.userInfo.accounts.map(acc => acc.type))];
      return types.map(type => ({
        type,
        accounts: this.userInfo.accounts.filter(acc => acc.type === type)
      }));
    },

    transactionTypes() {
      return [...new Set(this.transactions.map(tx => tx.type))];
    },

    statusOptions() {
      return [...new Set(this.transactions.map(tx => tx.status))];
    }
  }
});