<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <div class="logo">SimpleMall</div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        router
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/dashboard">
          <el-icon>
            <HomeFilled/>
          </el-icon>
          <span>仪表盘</span>
        </el-menu-item>
        <el-menu-item index="/products">
          <el-icon>
            <Box/>
          </el-icon>
          <span>商品管理</span>
        </el-menu-item>
        <el-menu-item index="/orders">
          <el-icon>
            <Document/>
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧主区域 -->
    <el-container>
      <!-- 顶部栏 -->
      <el-header class="header">
        <div class="user-info">
          <span>欢迎，{{ userEmail }}</span>
          <el-button type="danger" size="small" @click="logout">退出登录</el-button>
        </div>
      </el-header>

      <!-- 主内容 -->
      <el-main class="main-content">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router'
import {ref, computed} from 'vue'
import {HomeFilled, Box, Document} from '@element-plus/icons-vue'
import {ElMessage} from 'element-plus'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

const userEmail = ref(localStorage.getItem('email') || '用户')

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  background-color: #001529;
  color: white;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
  color: #fff;
}

.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #f5f5f5;
  padding: 0 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.main-content {
  padding: 20px;
  background: #fff;
}
</style>
