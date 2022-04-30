package com.example.OOPS_Project.Dashboard.WorkerSystem.repository;

import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import com.example.OOPS_Project.Dashboard.WorkerSystem.dto.*;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkerRepository extends JpaRepository<Worker,Integer> {

    @Query("select new com.example.OOPS_Project.Dashboard.WorkerSystem.dto.ServiceResponse(w.name, s.serviceName) from Worker w join w.services s")
    public List<ServiceResponse> getJoinInformation();
    Worker getWorkerByName(String name);
    Worker getWorkerById(int id);
    List<Worker> getAllByParkingSpace(ParkingSpace parkingSpace);

}
