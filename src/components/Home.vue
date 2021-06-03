<template>
  <div>
    <el-container class="home-container">
      <!--      内容区域-->
      <el-container>
        <el-aside :style="{width:menuStatus}">
          <div :class="isCollapse?'aside-logo-shrink':'aside-logo'">
            <img src="../assets/logocore.png" alt="logo">
            <span>Beans Admin</span>
          </div>
          <!-- 侧边栏菜单 -->
          <el-menu
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409eff"
              unique-opened
              :collapse="isCollapse"
              :collapse-transition="false"
              :router="true"
              :default-active="activePath">
            <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级子菜单 -->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                            @click="saveNavState('/'+subItem.path)">
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
          <Header v-on:toggleMenu="toggleCollapse"/>
          <!--路由插件-->
          <router-view/>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import Header from '@/components/comm/Header.vue'

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
      isCollapse: false,
      activePath: ''
    }
  },
  components: {
    Header
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  computed: {
    menuStatus() {
      return this.isCollapse ? '64px' : '200px'
    }
  },
  methods: {
    //点击按钮切换菜单的折叠和展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
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

    saveNavState(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
  },
}

</script>

<style lang="scss" scoped>
.home-container {
  height: 100vh;
}

.el-aside {
  background-color: #333744;
  transition: all 250ms linear;

  > .aside-logo {
    padding: 15px 0 15px 15px;
    display: flex;
    align-items: center;

    img {
      width: 48px;
      height: 48px;
    }

    > span {
      padding-left: 15px;
      color: white;
      font-size: 18px;
      white-space: nowrap;
    }
  }

  > .aside-logo-shrink {
    padding: 15px 0 15px 0;
    text-align: center;

    img {
      width: 48px;
      height: 48px;
    }

    > span {
      display: none;
    }
  }

  > .toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: white;
    text-align: right;
    padding-right: 10px;
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