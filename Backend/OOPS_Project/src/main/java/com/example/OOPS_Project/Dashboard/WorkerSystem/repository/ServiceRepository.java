package com.example.OOPS_Project.Dashboard.WorkerSystem.repository;

import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Integer>
{
    Service getServiceById(int id);
}
