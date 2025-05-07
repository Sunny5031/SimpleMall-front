<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>欢迎登录</h2>
      <el-form :model="form" label-width="60px">
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button @click="router.push('/register')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:8082/apply/user/login', form)
    const token = res.data.token
    localStorage.setItem('token', token)
    router.push('/home')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    alert('登录失败，请检查邮箱或密码')
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}

.login-card {
  width: 400px;
  padding: 20px;
}
</style>
