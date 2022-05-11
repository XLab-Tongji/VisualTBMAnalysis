package com.example.loginspr.serviceImpl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.example.loginspr.bean.UserBean;
import com.example.loginspr.bean.UsersBo;
import com.example.loginspr.mapper.UserMapper;
import com.example.loginspr.service.UserService;
import com.example.loginspr.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.example.loginspr.common.Result;

import javax.annotation.Resource;
import java.util.Random;

/**
 * @author Li wenyan
 */
@Service
public class UserServiceImpl implements UserService {
    /**
     * 将DAO注入Service层
     */
    @Resource
    private UserMapper userMapper;

    @Autowired
    private JavaMailSenderImpl mailSender;

    /**
     * 用于登录
     * @author Wenyan Li
     * @param user 用户
     * @return 返回
     */
    @Override
    public Result<?> selectUserName(@RequestBody UserBean user) {
        QueryWrapper<UserBean> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", user.getUsername());
        queryWrapper.eq("password", user.getPassword());
        UserBean res = userMapper.selectOne(queryWrapper);
        if (res == null) {
            return Result.error("-1", "用户名或密码错误");
        }
        // 生成token
        String token = TokenUtils.genToken(res);
        res.setToken(token);
        return Result.success(res);
    }

    /**
     * 用于注册
     * @author Wenyan Li
     * @param user 用户
     * @return 返回
     */
    @Override
    public Result<?> addUser(@RequestBody UserBean user) {
        UserBean res = userMapper.selectOne(Wrappers.<UserBean>lambdaQuery().eq(UserBean::getUsername, user.getUsername()));
        if (res != null) {
            return Result.error("-1", "用户名重复");
        }
        userMapper.insert(user);
        return Result.success();
    }

    @Override
    public Result<?> getById(@PathVariable Long id) {
        return Result.success(userMapper.selectById(id));
    }

    @Override
    public Result<?> email(@RequestBody UsersBo user) {
        Result result = new Result();
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        UserBean res = userMapper.selectOne(Wrappers.<UserBean>lambdaQuery().eq(UserBean::getEmail, user.getEmail()));
        if (res != null) {
            return Result.error("-1", "该邮箱已被注册");
        }
        // 生成随机数
        String code = randomCode();
        // 主题
        simpleMailMessage.setSubject("泥水盾构可视化平台验证码邮件");
        // 内容
        simpleMailMessage.setText("本次请求的邮箱验证码是：" + code+"，请及时输入。" );
        simpleMailMessage.setFrom("1685757000@qq.com");
        // 收件人
        simpleMailMessage.setTo(user.getEmail());
        try {
            mailSender.send(simpleMailMessage);
        } // 发送

        catch (Exception e) {
            e.printStackTrace();
            return Result.error("-1", "验证码发送失败");
        }
        result.setEcode(code);
        result.setCode("0");
        result.setMsg("成功");
        return result;
    }

    /**
     * 随机生成6位数的验证码
     * @return String code
     */
    @Override
    public String randomCode() {
        final Integer NUM = 6;
        StringBuilder str = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < NUM; i++) {
            str.append(random.nextInt(10));
        }
        return str.toString();
    }

    @Override
    public Result<?> deleteUser(@PathVariable Long id)
    {
        return Result.success(userMapper.deleteById(id));
    }

}
