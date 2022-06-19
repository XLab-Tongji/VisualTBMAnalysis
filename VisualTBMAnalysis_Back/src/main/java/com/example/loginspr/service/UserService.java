package com.example.loginspr.service;

import com.example.loginspr.bean.UserBean;
import com.example.loginspr.bean.UsersBo;
import com.example.loginspr.common.Result;

/**
 * @author Wenyan Li
 */
public interface UserService {
    /**
     * 登录
     * @author Wenyan Li
     * @param user 用户
     * @return 返回结果
     */
    Result<?> selectUserName(UserBean user);
    /**
     * 注册
     * @author Wenyan Li
     * @param user 用户
     * @return 返回结果
     */
    Result<?> addUser(UserBean user);
    /**
     * 发送验证码
     * @author Wenyan Li
     * @param user 用户
     * @return 返回结果
     */
    Result<?> email(UsersBo user);
    /**
     * 生成随机验证码
     * @author Wenyan Li
     * @return 返回结果
     */
    public String randomCode();
}

