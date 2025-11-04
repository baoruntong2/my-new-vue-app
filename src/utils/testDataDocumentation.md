# 测试数据集文档

## 概述
本文档描述了项目中两套独立测试数据集的设计目的、结构和使用方法，确保测试场景隔离与功能验证的准确性。

## 1. 嵌入式系统测试数据集
**文件路径**: `src/utils/embeddedTestData.js`
**用途**: 作为系统环境组成部分，验证系统流程设计的完整性与逻辑合理性

### 1.1 数据结构
- **users**: 预设用户信息集合，包含：
  - 基础个人信息（姓名、身份证号、联系方式等）
  - 系统生成数据（验证码、临时令牌、会话ID等）
  - 业务相关数据（账户余额、交易限额、权限等）
- **testScenarios**: 系统流程测试场景，包含：
  - authentication: 认证测试用例（成功/失败场景）
  - authorization: 授权测试用例（权限验证场景）

### 1.2 使用方法
```javascript
import { embeddedTestData } from '@/utils/embeddedTestData';

// 获取预设用户信息
const testUser = embeddedTestData.users.find(user => user.id === 'USER001');

// 验证认证流程
const authScenario = embeddedTestData.testScenarios.authentication.successCase;
```

## 2. 独立代码验证数据集
**文件路径**: `src/utils/standaloneTestData.js`
**用途**: 作为独立测试资源，验证代码基础运行能力与功能正确性

### 2.1 数据结构
- **validUsers**: 正常用户数据，验证基本功能
- **boundaryTestCases**: 边界情况测试，验证数据处理逻辑
- **errorTestCases**: 异常数据测试，验证错误处理能力
- **apiTestCases**: 接口调用测试，验证API交互规范性

每个测试用例包含：
- 基础个人信息
- testCaseType: 测试类型标识
- expectedResult: 预期结果
- expectedErrorMessage/warningMessage: 预期错误/警告信息

### 2.2 使用方法
```javascript
import { generateStandaloneTestCases } from '@/utils/standaloneTestData';

// 生成测试用例
const testCases = generateStandaloneTestCases();

// 获取边界测试用例
const emptyNameCase = testCases.boundaryTestCases.find(case => case.testCaseType === 'empty_name');
```

## 3. 数据隔离原则
- **存储隔离**: 两套数据集位于独立文件，避免相互引用
- **使用隔离**: 嵌入式数据集仅用于系统集成测试，独立数据集仅用于单元测试和代码验证
- **管理隔离**: 数据集更新需分别维护，确保测试场景独立性

## 4. 维护指南
- 新增测试场景时，需明确属于哪类数据集，避免混合使用
- 修改数据结构时，需同步更新对应文档和引用该数据的测试用例
- 定期清理过期测试数据，保持数据集精简有效