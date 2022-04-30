package com.example.OOPS_Project.Registeration;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "register")
@AllArgsConstructor
public class UserRegistrationController {

    private RegistrationService registrationService;
    @PostMapping()
    public String register(@RequestBody RegistrationRequest request)
    {
        return registrationService.register(request);
    }
    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("id") String id)
    {
        return registrationService.Verify(id);
    }
}
