package com.example.loginspr.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.loginspr.bean.UserBean;

/**
 * @author Wenyan Li
 */
public interface UserMapper extends BaseMapper<UserBean> {
    /**
     * 获取用户
     * @author Wenyan Li
     * @param name 用户名
     * @param password 密码
     * @return 返回一个UserBean
     */
    UserBean getInfo(String name,String password);
}
