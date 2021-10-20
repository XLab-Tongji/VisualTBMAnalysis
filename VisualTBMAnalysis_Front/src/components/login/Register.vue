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

    <div align="center" style="position:relative;top:100px">  <img src="@/assets/image/title1.png"  style="width:800px;" /></div>
 
    <dv-border-box-10 :color="['#3fb1e3', '#96dee8']" class="login_box2">

      <!-- 表单区域 -->
      <div class="box2">
        <span></span>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="80px"
        
        size="medium"
        class="login_form2"
      >
        <h2 align="center">注册信息</h2>

        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email" label="电子邮箱">
          <el-input
            v-model="loginForm.email"
            prefix-icon="el-icon-message"
          ></el-input>
        </el-form-item>
        <!-- 邮箱验证码 -->
        <el-form-item  prop="code" label="验证码">
          <el-input 
            v-model="loginForm.code"
            prefix-icon="el-icon-chat-round"
            style="width: 50%; "
          ></el-input>
          <el-button @click="getEmailCode()" :disabled="!show" style="width: 40%; float: right; ">
            <span v-show="show">发送验证码</span>
            <span v-show="!show" class="count">{{ count }} s后可点击重发</span>
          </el-button>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="rePassword" label="确认密码">
          <el-input
            v-model="loginForm.rePassword"
            prefix-icon="el-icon-check"
            type="password"
            class="length"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="text" @click="toLogin">已有账号，登陆</el-button>
          <el-button type="primary" @click="Register('loginForm')"
            >注册</el-button
          >
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- </el-form> -->

    </dv-border-box-10>
  </div>
</template>

<script>
const TIME_COUNT = 60; // 设置一个全局的倒计时的时间

import request from "@/utils/request";

export default {
  name: "Register",
  data() {
    //在data里面定义两个校验器,检验两次密码是否一致
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      count:0,
      //这是注册表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
        rePassword: "",
        email: "",
        code: "",
      },

      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
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
          {
            validator: function (rule, value, callback) {
              //校验密码的正则: ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$
              if (
                /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(value) ==
                false
              ) {
                callback(
                  new Error("请输入包含字母和数字的组合，不能使用特殊字符")
                );
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //确认密码是否正确
        rePassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
          { validator: validatePass1, trigger: "blur" },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      show: true,
      activeName: "first",
      Ecode: "",
      radio: "1",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //向邮箱发送验证码
    getEmailCode() {
      console.log("eess6@163.com");
      if (this.loginForm.email === "") {
        this.$message.error("请先输入邮箱再点击获取验证码");
      } else {
        let regemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!regemail.test(this.loginForm.email)) {
          this.$message({
            showClose: true,
            message: "请输入格式正确有效的邮箱号!",
            type: "error",
          });
        } else {
          console.log("经过检验格式正确");//已执行
          request.post("/email", this.loginForm).then((res) => {
            console.log("2222222");//未执行
            if (res.code === "0") {
              this.$message({
                showClose: true,
                type: "success",
                message: "验证码已发送",
              });
              console.log("3333333");//未执行
              this.Ecode = res.Ecode;
              console.log(res.Ecode);
            } else {
              console.log("4444444");//未执行
              this.$message({
                message: res.msg,
                type: "error",
                showClose: true,
              });
            }
          });
        }
      }
      console.log("55555");//执行
      // 验证码倒计时
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    //跳转到登录界面
    toLogin() {
     this.$router.push("/login");//not
    },
    //点击重置按钮，重置登录
    resetloginForm() {
      this.$refs.loginForm.resetFields();
    },

    //注册功能
    Register() {
      this.$refs.loginFormRef.validate((valid, wrongstring) => {
        if (valid) {
          if (!this.loginForm.code) {
            this.$message.error("请填写验证码");
            return;
          }
          if (this.loginForm.code.toLowerCase() !== this.Ecode.toLowerCase()) {
            this.$message.error("验证码错误");
            return;
          }

          request.post("/register", this.loginForm).then((res) => {
            console.log(res.code)
            if (res.code === "0") {
              this.$message({
                type: "success",
                message: "注册成功",
                showClose: true,
              });
              this.$router.push("/login"); //登录成功之后进行页面的跳转，跳转到主页not
            } 
            else {
              this.$notify({
                title: "提示",
                message: res.msg,
                type: "error",
                duration: 3000,
              });}
          });
        } 
        else {
          console.log(valid, wrongstring);
          console.log("error submit");
          return false;
        }
      });
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


.login_box2 {
  width: 450px;
  height: 500px;
  //background-color: #ffffff;
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
.login_box2 .box2::after {
  content: "";
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: linear-gradient(45deg, #9607b9, #3f50eb);
}

/* 这里是为了实现渐变边框虚化 */
.login_box2 .box2::before {
  content: "";
  position: absolute;
  border-radius: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: linear-gradient(45deg, #9607b9, #3f50eb);
  filter: blur(30px);
}

.login_box2 .box2 span {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.login_form2 {
  position: absolute;
  width: 100%;
  padding: 20px 40px;
  //align-self: center;
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