package com.example.loginspr.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.loginspr.bean.UserBean;

public interface UserMapper extends BaseMapper<UserBean> {
    UserBean getInfo(String name,String password);
}
