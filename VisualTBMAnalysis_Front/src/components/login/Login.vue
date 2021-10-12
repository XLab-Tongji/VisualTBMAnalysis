<template>
  <div>
    <div class="bg">
    </div>
    <vue-particles
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="150"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
      class="lizi"
    />

  <div align="center" style="position:relative;top:150px">  <img src="@/assets/image/title1.png"  style="width:800px;" /></div>
 
    <dv-border-box-10 :color="['#3fb1e3', '#96dee8']" class="login_box">
      <!-- 登录表单区域 -->
      <div class="box">
        <span></span>
      </div>
      <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules"
        label-width="0px" class="login_form"  >

        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <div style="display: flex">
            <el-input
              prefix-icon="el-icon-key"
              v-model="loginForm.validCode"
              style="width: 50%"
              placeholder="请输入验证码"
            ></el-input>
            <ValidCode @input="createValidCode" />
          </div>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="Login">登录</el-button>
          <el-button type="primary" @click="toRegister">注册</el-button>
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </dv-border-box-10>
   <!-- </dv-border-box-10> -->

  </div>
</template>

<script>
import request from "@/utils/request";
import ValidCode from "./ValidCode.vue";

export default {
  name: "login",
  components: {
    ValidCode,
  },
  data() {
    return {
      //验证码
      validCode: "",
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
        validCode: "",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户ID是否合法
        username: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      activeName: "first",
      /* 背景图片 imgSrc: require("../assets/bg2.png"), */
    };
  },
  created() {
    sessionStorage.removeItem("user");
  },

  methods: {
    // 接收验证码组件提交的 4位验证码
    createValidCode(data) {
      this.validCode = data;
    },

    //点击重置按钮，重置登录
    resetloginForm() {
      this.$refs.loginFormRef.resetFields();
    },

    //登录
    Login() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          if (!this.loginForm.validCode) {
            this.$message.error("请填写验证码");
            return;
          }
          if (
            this.loginForm.validCode.toLowerCase() !==
            this.validCode.toLowerCase()
          ) {
            this.$message.error("验证码错误");
            return;
          }

          request.post("/login", this.loginForm).then((res) => {
            if (res.code === "0") {
              this.$notify({
                title: "提示",
                message: "用户登录成功",
                type: "success",
                duration: 3000,
              });
              sessionStorage.setItem("user", JSON.stringify(res.data)); // 缓存用户信息
              this.$router.push("/home"); //登录成功之后进行页面的跳转，跳转到主页
            } else {
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "error",
                duration: 3000,
              });
            }
          });
        }
      });

    },

    toRegister() {
      this.$router.push("/register");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  background-color: rgb(255, 255, 255);
}
.login_box {
  width: 450px;
  height: 320px;
  opacity: 0.9;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border: 1px solid #d8d2d2;
}

/* 通过两个伪类来实现渐变 */
/* 这里是为了实现渐变边框 */
.login_box .box::after {
  content: "";
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  width: 80%;
  height: 80%;
  //background: linear-gradient(45deg, #3571e0, #ffffff);
}

/* 这里是为了实现渐变边框虚化 */
.login_box .box::before {
  content: "";
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: linear-gradient(45deg, #f7f7f7, #3f50eb);
  filter: blur(30px);
}

.login_box .box span {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  //background-color: rgba(255, 255, 255, 0.205);
  z-index: 2;
}


.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
  z-index: 3;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.lizi {
  position: fixed;
  top: 0;
  width: 100%;
  background: #ffffff00;
}


h2 {
  color: #ffffff;
  font-family: Arial;
  font-size: 24px;
  font-weight: 300;
}
</style>