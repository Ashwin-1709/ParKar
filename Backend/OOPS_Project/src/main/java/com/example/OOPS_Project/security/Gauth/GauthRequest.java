package com.example.OOPS_Project.security.Gauth;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class GauthRequest {

    private String email;
    private String firstname;
    private String lastname;
    private String token;
}
