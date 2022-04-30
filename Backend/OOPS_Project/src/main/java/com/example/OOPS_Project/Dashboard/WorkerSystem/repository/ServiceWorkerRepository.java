package com.example.OOPS_Project.Dashboard.WorkerSystem.repository;

import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.ServiceWork;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceWorkerRepository extends JpaRepository<ServiceWork,Integer> {
    List<ServiceWork> getServiceWorkByWorker(Worker worker);
}
