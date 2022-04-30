package com.example.OOPS_Project.security.Gauth;


import com.example.OOPS_Project.UserApp.AppUser;
import com.example.OOPS_Project.UserApp.UserRepository;
import lombok.AllArgsConstructor;
import org.json.simple.JSONValue;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class GoogleAuthService {

    private UserRepository repo;

    public String Gauth(GauthRequest gauthRequest)
    {
        if(!repo.findByEmail(gauthRequest.getEmail()).isPresent())
        {
            throw new IllegalStateException("not registered");
        }
        else
        {
            AppUser appUser = repo.findByMail(gauthRequest.getEmail());
            if(appUser.getEnabled() == false)
            {
                repo.enableAppUser(gauthRequest.getEmail());

            }
            String s = appUser.getToken();
            if( s.equals("default"))
            {
                repo.UpdateToken(gauthRequest.getToken() , gauthRequest.getEmail());
            }
            else if(!s.equals(gauthRequest.getToken()))
            {
                throw new IllegalStateException("invalid authorisation");
            }
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


}
