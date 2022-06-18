package com.example.loginspr.serviceImpl;

import com.example.loginspr.LoginsprApplication;
import com.example.loginspr.common.Result;
import com.example.loginspr.service.UserService;
import com.example.loginspr.bean.UsersBo;
import com.example.loginspr.bean.UserBean;
import javafx.application.Application;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.junit.runners.Parameterized.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import com.example.loginspr.bean.UserBean;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LoginsprApplication.class)
class UserServiceImplTest {
    @Autowired
    private UserService userService;
    //public UserBean userbean;
    public UsersBo userbo;

    //下面为登录测试用例,针对函数selectUserName
    @Test
    void login_positive() {
        //正向登录测试用例：用户名存在，密码对应
        UserBean userbean = new UserBean();
        userbean.setUsername("yangjing");
        userbean.setPassword("123abc");

        assertEquals("成功",userService.selectUserName(userbean).getMsg());
    }

    @Test
    void login_negative_1() {
        //反登录测试用例：用户名密码不对应
        UserBean userbean = new UserBean();
        userbean.setUsername("yangjing");
        userbean.setPassword("123abcd");

        assertEquals("用户名或密码错误",userService.selectUserName(userbean).getMsg());
    }


    @Test
    void login_negative_2() {
        //反登录测试用例：数据库中不存在该用户
        UserBean userbean = new UserBean();
        userbean.setUsername("niuniu");
        userbean.setPassword("123abc");

        assertEquals("-1",userService.selectUserName(userbean).getCode());
    }

    //下面为注册测试用例，针对函数addUser
    @Test
    void register_positive() {
        //正向注册测试用例：用户名和已有用户名不重复
        UserBean userbean = new UserBean();
        userbean.setUsername("test");
        userbean.setPassword("123abc");
        userbean.setEmail("aaa@163.com");
        assertEquals("0", userService.addUser(userbean).getCode());
    }

    @Test
    void register_negative() {
        //正向注册测试用例：用户名和已有用户名重复
        UserBean userbean = new UserBean();
        userbean.setUsername("yangjing");
        userbean.setPassword("123abc");

        assertEquals("用户名重复", userService.addUser(userbean).getMsg());
    }

    //下面为注册时候发送邮箱验证码的测试用例，针对函数email
    @Test
    void email_positive() {
        UsersBo usersbo = new UsersBo();
        usersbo.setEmail("eess@163.com");

        assertEquals("成功",userService.email(usersbo).getMsg());
    }

    @Test
    void email_negative() {
        UsersBo usersbo = new UsersBo();
        usersbo.setEmail("eess6@163.com");

        assertEquals("该邮箱已被注册",userService.email(usersbo).getMsg());
    }

}