package com.example.OOPS_Project.login;


import com.example.OOPS_Project.UserApp.AppUser;
import com.example.OOPS_Project.UserApp.UserRepository;
import org.json.simple.JSONValue;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class LoginService {

    private UserRepository repo;

    public String login_logic(LoginRequest loginRequest)
    {
        if(!repo.findByEmail(loginRequest.getMail()).isPresent())
        {
            throw new IllegalStateException("user does not exist");
        }


        AppUser appUser = repo.findByMail(loginRequest.getMail());

       /* if(appUser.getPassword() != loginRequest.getPassword())
        {
           throw new IllegalStateException("invalid credential");
        }*/
        String s = appUser.getPassword();
        String l = loginRequest.getPassword();
        int a = (s.equals(l))?1:0;

        if(a == 0)
        {
            throw new IllegalStateException("invalid credentials");
        }
        if(!appUser.getEnabled()) throw new IllegalStateException("not activated");

        Map obj = new HashMap();
        obj.put("firstname",appUser.getFirstname());
        obj.put("lastname",appUser.getLastname());
        obj.put("username",appUser.getUsername());
        obj.put("email",appUser.getEmail());
        obj.put("reg_id",appUser.getReg_id());
        obj.put("phone_num",appUser.getPhone_num());
        obj.put("app_user_role",appUser.getAppUserRole().toString());
        obj.put("address",appUser.getAddress());


        String UserObject = JSONValue.toJSONString(obj);
        return UserObject;
    }

}
