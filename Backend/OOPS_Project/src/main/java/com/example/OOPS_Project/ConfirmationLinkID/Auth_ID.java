package com.example.OOPS_Project.ConfirmationLinkID;

import com.example.OOPS_Project.UserApp.AppUser;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Auth_ID {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String authtoken;
    @Column(nullable = false)
    private LocalDateTime sent_time;
    @Column(nullable = false)
    private LocalDateTime expire_time;
    private LocalDateTime auth_time;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(
            nullable = false,
            name = "user"
    )
    private AppUser appUser;

    public Auth_ID(String authtoken, LocalDateTime sent_time, LocalDateTime expire_time, AppUser appUser) {
        this.authtoken = authtoken;
        this.sent_time = sent_time;
        this.expire_time = expire_time;
        this.appUser = appUser;
    }
}
