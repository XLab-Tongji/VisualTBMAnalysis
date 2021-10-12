<template>
  <div>
    <div class="login_background2">
      <!-- 背景图片 <img :src="imgSrc" width="100%" height="100%" alt="" /> -->
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
    <div class="login_box2">
      <!-- 表单区域 -->
      <div class="box2">
        <span></span>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="80px"
        :inline="true"
        size="medium"
        class="login_form2"
      >
        <h2 align="center">Registering for an account…</h2>
       
        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 电话号码 -->
        <el-form-item prop="email" label="电子邮箱">
          <el-input
            v-model="loginForm.email"
            prefix-icon="el-icon-user"
          ></el-input>
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
            prefix-icon="el-icon-lock"
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
    </div>
  </div>
</template>

<script>
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
      //这是注册表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
        rePassword: "",
        email:"",
      },

      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
          // {
          //   validator: function (rule, value, callback) {
          //     //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
          //     if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
          //       callback(new Error("请输入中文"));
          //     } else {
          //       //校验通过
          //       callback();
          //     }
          //   },
          //   trigger: "blur",
          // },
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
      activeName: "first",
      // imgSrc: require("../assets/bg.png"),
      radio: "1",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //跳转到登录界面
    toLogin() {
      this.$router.push("/login");
    },
    //点击重置按钮，重置登录
    resetloginForm() {
      this.$refs.loginForm.resetFields();
    },

    //注册功能
    Register(loginForm) {
      this.$refs[loginForm].validate((valid, wrongstring) => {
        if (valid) {
          request.post("/register", this.loginForm).then((res) => {
            if (res.code === "0") {
              this.$message({
                type: "success",
                message: "注册成功",
              });
              this.$router.push("/login"); //登录成功之后进行页面的跳转，跳转到主页
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          return false;
        }
      });

      // this.$refs[loginForm].validate((valid, wrongstring) => {
      //   // 获取loginform的实例（el-form），找到validate方法，根据验证规则rules校验是否valid
      //   if (valid) {
      //     //this.loading = true;
      //     registerFun({
      //       name: this.loginForm.username,
      //       password: this.loginForm.password,
      //       tel: this.loginForm.telephone,
      //       identification: this.loginForm.identification,
      //       sex: this.loginForm.sex,
      //     })
      //       .then((res) => {
      //         if (res.result === false) {
      //           this.$notify({
      //             title: "提示",
      //             message: "用户已注册过账号，无须再注册！",
      //             type: "warning",
      //             duration: 3000,
      //           });
      //         } else {
      //           this.$router.push("/login"); //注册成功路由实现跳转
      //           this.$message({
      //             showClose: true,
      //             message: `注册成功！请记住您的ID：${res.result}`,
      //             type: "success",
      //             duration: 0,
      //           });
      //         }
      //         console.log(res);
      //       })
      //       .catch((err) => {
      //         this.$notify({
      //           title: "提示",
      //           message: "用户访问错误",
      //           type: "error",
      //           duration: 0,
      //         });
      //         console.log(err);
      //       });
      //   } else {
      //     console.log(valid, wrongstring);
      //     console.log("error submit!!");
      //     return false;
      //   }
      // }
      // );
    },
  },
};
</script>

<style>
.login_background2 {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  background-color: rgb(255, 255, 255);
}

.login_box2 {
  width: 380px;
  height: 400px;
  background-color: #ffffff;
  opacity: 0.9;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-45%, -45%);
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
  background: linear-gradient(45deg, #9607b9, #3f50eb);
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
  background: linear-gradient(45deg, #9607b9, #3f50eb);
  filter: blur(30px);
}

.login_box2 .box2 span {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
}

.login_form2 {
  position: absolute;
  width: 100%;
  padding: 10px 10px;
  align-self: center;
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
  background: #3e3e3e;
}

h2 {
  color: #ffffff;
  font-family: Arial;
  font-size: 24px;
  font-weight: 300;
}
</style>