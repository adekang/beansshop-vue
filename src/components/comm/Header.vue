<template>
  <div>
    <!--头部区域 布局在中间-->
    <el-header>
      <div>
        <img src="../../assets/logocore.png" alt="logo">
      </div>
      <p>
        <Breadcrumb/>
      </p>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
  </div>
</template>

<script>
import Breadcrumb from '@/components/comm/Breadcrumb.vue'

export default {
  components: {
    Breadcrumb
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  margin: 0 0 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  background-color: #fff;
  border: 1px solid #f6f6f6;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.08);

  > div {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>