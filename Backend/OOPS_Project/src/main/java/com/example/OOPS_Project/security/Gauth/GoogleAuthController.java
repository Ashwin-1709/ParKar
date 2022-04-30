package com.example.OOPS_Project.security.Gauth;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sign_in_google")
@AllArgsConstructor
public class GoogleAuthController {

    private GoogleAuthService googleAuthService;

    @PostMapping
    public String Gauth(@RequestBody GauthRequest gauthRequest)
    {
        return googleAuthService.Gauth(gauthRequest);
    }
}
