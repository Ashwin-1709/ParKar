package com.example.OOPS_Project.Dashboard.Database;

import com.example.OOPS_Project.UserApp.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Balance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private AppUser appUser;

    @Column
    private Long balance;

    public Balance(AppUser appUser , Long balance) {
        this.appUser = appUser;
        this.balance = balance;

    }
}
