package com.example.loginspr.bean;
import lombok.Data;

/**
 * @author Wenyan Li
 */
@Data
public class UsersBo {
    private String email;
    private String code;

    @Override
    public String toString() {

        return "UsersBo{" +
                "email='" + email + '\'' +
                '}';
    }
}