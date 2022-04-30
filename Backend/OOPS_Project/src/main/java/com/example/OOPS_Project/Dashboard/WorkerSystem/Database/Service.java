package com.example.OOPS_Project.Dashboard.WorkerSystem.Database;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Getter
@Setter

public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int id;
    private String serviceName;
}
