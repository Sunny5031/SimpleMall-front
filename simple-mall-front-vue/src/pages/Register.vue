<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2>用户注册</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="用户姓名" prop="useName">
          <el-input v-model="form.userName" placeholder="请输入用户姓名"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button @click="goToLogin" :type="'default'">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import axios from 'axios'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import type {FormInstance} from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()

const form = reactive({
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  userName: [{required: true, message: '请输入用户信息', trigger: 'blur'}],
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change']}
  ],
  password: [{required: true, message: '请输入密码', trigger: 'blur'}],
  confirmPassword: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== form.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const handleRegister = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        await axios.post('http://localhost:8082/apply/user/register', {
          email: form.email,
          password: form.password,
          userName: form.userName
        })
        ElMessage.success('注册成功，请登录')
        router.push('/login')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        ElMessage.error('注册失败，邮箱可能已被使用')
      }
    }
  })
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}

.register-card {
  width: 400px;
  padding: 20px;
}
</style>
