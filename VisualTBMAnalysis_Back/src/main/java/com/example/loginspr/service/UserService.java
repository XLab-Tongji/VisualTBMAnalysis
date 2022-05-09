package com.example.loginspr.service;

import com.example.loginspr.bean.UserBean;
import com.example.loginspr.bean.UsersBo;
import com.example.loginspr.common.Result;
import org.springframework.web.bind.annotation.PathVariable;

public interface UserService {
    Result<?> selectUserName(UserBean user); //登录
    Result<?> addUser(UserBean user); //注册
    Result<?> email(UsersBo user);
    public String randomCode(); //生成随机验证码
    public Result<?> getById(@PathVariable Long id);
    public Result<?> deleteUser(@PathVariable Long id); //注销
}
