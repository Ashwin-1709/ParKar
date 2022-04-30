package com.example.OOPS_Project.UserApp;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser  implements UserDetails
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String firstname;
    @Column(unique = true)
    private String lastname;
    @Column(unique = true)
    private String username;
    @Column()
    private String password;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String reg_id;
    @Column(unique = true)
    private String phone_num;
    @Enumerated(EnumType.STRING )
    private AppUserRole appUserRole;
    @Column()
     private String address;
    @Column()
    private String token = "default";

    @Column
    private Boolean locked = false;
    @Column
    private Boolean enabled = false;

    public AppUser(String firstname, String lastname, String username, String password, String email, String reg_id, String phone_num, AppUserRole appUserRole , String address) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.reg_id = reg_id;
        this.phone_num = phone_num;
        this.appUserRole = appUserRole;
        this.address = address;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singleton(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getFirstname(){
        return firstname;
    }

    public String getLastname(){
        return lastname;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
