package com.example.OOPS_Project.Dashboard.WorkerSystem.Database;

import com.example.OOPS_Project.Dashboard.Database.DateTime;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@ToString
@Getter
@Setter
@AllArgsConstructor
public class Worker implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String number;
    private String mail;
    private String password;
    @ManyToOne
    private ParkingSpace parkingSpace;

    //    @JsonIgnore
    @JsonIgnore
    @OneToMany(cascade=CascadeType.ALL)
    private List<DateTime> dateTimes;
        @JsonIgnore
    @ManyToMany(cascade = {
//            CascadeType.PERSIST,
//            CascadeType.MERGE
    })
//    @JoinColumn(name = "worker", referencedColumnName = "name")
//    @JsonIgnore
    private List<Service> services;

    public Worker() {
    }


}
