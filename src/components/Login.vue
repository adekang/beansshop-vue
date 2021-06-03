<template>
  <div class="login_container">
    <!-- 登录盒子  -->
    <div class="login_box">
      <!--      -->
      <div class="login_title">
        <h1>Beans Admin</h1>
        <p>一个好用的商品后台管理系统</p>
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginForm" ref="LoginFormRef" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima">
          </el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //数据绑定
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单验证规则
      loginFormRules: {
        username: [
          {required: true, message: '请输入登录名', trigger: 'blur'},
          {
            min: 3,
            max: 10,
            message: '登录名长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            min: 6,
            max: 15,
            message: '密码长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      },
      loginLoading: false
    }
  },
//添加行为，
  methods: {
    //添加表单重置方法
    resetLoginForm() {
      //this=>当前组件对象，其中的属性$refs包含了设置的表单ref
      this.$refs.LoginFormRef.resetFields()
    },
    login() {
      this.loginLoading = false
      //点击登录的时候先调用validate方法验证表单内容是否有误
      this.$refs.LoginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        this.loginLoading = true
        //发送请求进行登录
        const {data: res} = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败:' + res.meta.msg)
        }
        this.$message.success('登录成功')
        //保存token
        window.sessionStorage.setItem('token', res.data.token)
        // 导航至/home
        await this.$router.push('/home')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background: RGB(104,149,207) url(../assets/bgimage.png) center/100% no-repeat;

}

.login_box {
  max-width: 350px;
  width: 350px;
  height: 480px;
  background: #fff url(../assets/logbg.jpg) center bottom no-repeat;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 2px 15px rgba(0, 0, 0, .3);
  -webkit-backface-visibility: hidden;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  -moz-transition-duration: 0.3s;
  transition-duration: 0.3s;

  .login_title {
    display: flex;
    flex-direction: column;
    text-align: center;

    > h1 {
      font-size: 30px;
      margin: 14px;
    }

    > p {
      margin: 0;
      font-size: 16px;
    }
  }
}

.login_form {
  position: absolute;
  top: 135px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: space-between;
}
</style>
