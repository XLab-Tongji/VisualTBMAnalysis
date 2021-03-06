package com.example.loginspr.controller;

import com.example.loginspr.bean.UserBean;
import com.example.loginspr.bean.UsersBo;
import com.example.loginspr.common.Result;
import com.example.loginspr.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author Wenyan Li
 */
@Controller
public class UserController {
    /**
     * 将Service注入Web层
     */
    @Autowired
    UserService userService;

    /**
     * 登录
     * @author Wenyan Li
     * @param user 用户
     * @return 返回
     */
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST )
    public Result<?> login(@RequestBody UserBean user) {
        return userService.selectUserName(user);
    }

    /**
     * 注册
     * @author Wenyan Li
     * @param user 用户
     * @return 返回
     */
    @ResponseBody
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public Result<?> register(@RequestBody UserBean user) {
        return userService.addUser(user);
    }

    /**
     * 邮箱验证
     * @author Wenyan Li
     * @param user 用户
     * @return 返回
     */
    @ResponseBody
    @RequestMapping(value = "/email",method = RequestMethod.POST)
    public Result<?> email(@RequestBody UsersBo user) {
        return userService.email(user);
    }

}
