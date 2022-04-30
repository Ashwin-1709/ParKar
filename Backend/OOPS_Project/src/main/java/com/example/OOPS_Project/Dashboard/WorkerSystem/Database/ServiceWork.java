package com.example.OOPS_Project.Dashboard.WorkerSystem.Database;

import com.example.OOPS_Project.Dashboard.Database.DateTime;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceWork
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade=CascadeType.ALL)
    private Service service;

    @OneToOne(cascade=CascadeType.ALL)
    private Worker worker;

    @OneToOne(cascade=CascadeType.ALL)
    private DateTime dateTime;

    public ServiceWork(Service service, Worker worker, DateTime dateTime) {
        this.service = service;
        this.worker = worker;
        this.dateTime = dateTime;
    }

    public ServiceWork(Worker worker) {
        this.worker = worker;
    }
}
