package com.example.OOPS_Project.UserApp;

import com.example.OOPS_Project.Registeration.RegistrationRequest;
import com.example.OOPS_Project.Registeration.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("WorkerReg")
@AllArgsConstructor
public class WorkerLoginController {

    private RegistrationService registrationService;
    @PostMapping
    public String AddWorker(@RequestParam RegistrationRequest request)
    {
        return registrationService.addWorker(request);
    }
}
