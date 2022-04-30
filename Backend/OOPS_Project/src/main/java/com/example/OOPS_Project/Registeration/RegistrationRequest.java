package com.example.OOPS_Project.Registeration;

import lombok.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    private final String firstname;
    private final String lastname;
    private final String username;
    private final String email;
    private final String password;
    private final String reg_id;
    private final String phone_num;
    private final String address;

}
