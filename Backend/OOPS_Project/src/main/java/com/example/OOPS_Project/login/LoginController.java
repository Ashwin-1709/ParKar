package com.example.OOPS_Project.login;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sign_in")
@AllArgsConstructor
public class LoginController {

    private LoginService loginService;

    @PostMapping()
    public String afterlogin(@RequestBody LoginRequest loginRequest)
    {
        return loginService.login_logic(loginRequest);
    }
}
