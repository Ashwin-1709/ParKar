package com.example.OOPS_Project.UserApp;

import com.example.OOPS_Project.Registeration.RegistrationRequest;
import com.example.OOPS_Project.Registeration.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "admin")
@AllArgsConstructor
public class AdminController {

    private RegistrationService registrationService;
    @PostMapping
    public String admin(@RequestBody RegistrationRequest request)

    {
        return registrationService.addAdmin(request);
    }

}
