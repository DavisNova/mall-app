<template>
  <div class="login-page">
    <div class="login-card">
      <h1>客服管理系统</h1>
      
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            size="large"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            size="large"
          />
        </van-cell-group>

        <div class="submit-btn">
          <van-button 
            round 
            block 
            type="primary" 
            native-type="submit"
            :loading="loading"
            size="large"
          >
            登录
          </van-button>
        </div>
      </van-form>

      <div class="login-tips">
        <p>测试账号: admin</p>
        <p>测试密码: admin</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

const onSubmit = async (values: any) => {
  loading.value = true
  try {
    // TODO: 实现实际的登录逻辑
    // 这里暂时使用模拟数据
    if (values.username === 'admin' && values.password === 'admin') {
      const toast = useToast()
      toast.success('登录成功')
      // 存储登录状态
      localStorage.setItem('adminLoggedIn', 'true')
      router.push('/admin/chat')
    } else {
      const toast = useToast()
      toast.fail('用户名或密码错误')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d1f3d 100%);
}

.login-card {
  width: 100%;
  max-width: 480px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.login-card h1 {
  text-align: center;
  color: #fff;
  font-size: 28px;
  margin-bottom: 32px;
  background: linear-gradient(to right, #fff, #ff8eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:deep(.van-cell) {
  background: transparent;
  margin-bottom: 16px;
  padding: 16px;
}

:deep(.van-field__label) {
  color: rgba(255, 255, 255, 0.8);
  width: 80px;
}

:deep(.van-field__control) {
  color: #fff;
  font-size: 16px;
}

:deep(.van-cell-group--inset) {
  margin: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
}

.submit-btn {
  margin-top: 32px;
  padding: 0 16px;
}

:deep(.van-button--primary) {
  background: linear-gradient(to right, #ff4d8c, #ff8eb3);
  border: none;
  height: 48px;
  font-size: 18px;
}

.login-tips {
  margin-top: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.login-tips p {
  margin: 8px 0;
}

/* PC端适配 */
@media screen and (min-width: 768px) {
  .login-card {
    padding: 60px;
  }

  .login-card h1 {
    font-size: 32px;
  }

  :deep(.van-cell) {
    padding: 20px;
  }

  :deep(.van-field__label) {
    width: 100px;
    font-size: 16px;
  }

  :deep(.van-field__control) {
    font-size: 18px;
  }
}
</style> 