<template>
  <div>
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/logocore.png" alt="logo">
          <span>beans后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse? '64px': '200px'">
          <!-- 菜单折叠 -->
          <div class="toggle-button" @click="toggleCollapse">
            |||
          </div>
          <!-- 侧边栏菜单 -->
          <el-menu
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409eff"
              unique-opened
              :collapse="isCollapse"
              :collapse-transition="false"
              :router="true">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级子菜单 -->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
                <!-- 二级菜单模板 -->
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <!--路由插件-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取左侧菜单数据
    async getMenuList() {
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    //点击按钮切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }

}

</script>

<style lang="scss" scoped>
.home-container {
  height: 100vh;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    img {
      width: 64px;
      height: 64px;
    }

    > span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  transition: all 250ms linear;

  > .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: white;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}
</style>