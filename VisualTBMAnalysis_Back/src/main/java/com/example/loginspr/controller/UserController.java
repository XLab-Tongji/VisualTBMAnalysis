package com.example.loginspr.controller;

import com.example.loginspr.bean.UserBean;
import com.example.loginspr.bean.UsersBo;
import com.example.loginspr.common.Result;
import com.example.loginspr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {
    //将Service注入Web层
    @Autowired
    UserService userService;

    //登录
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    @CrossOrigin(value = "http://localhost:8080", maxAge = 1800, allowedHeaders ="*")
    public Result<?> login(@RequestBody UserBean user) {
        return userService.selectUserName(user);
    }

    //注册
    @ResponseBody
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public Result<?> register(@RequestBody UserBean user) {
        return userService.addUser(user);
    }

    //邮箱验证
    @ResponseBody
    @RequestMapping(value = "/email",method = RequestMethod.POST)
    public Result<?> email(@RequestBody UsersBo user) {
        return userService.email(user);
    }

    //确认当前用户是否合法
    @ResponseBody
    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    public Result<?> getById(@PathVariable Long id){
        return userService.getById(id);
    }

    @ResponseBody
    @RequestMapping(value="/deleteUser/{id}", method = RequestMethod.POST)
    public Result<?> deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }
}
