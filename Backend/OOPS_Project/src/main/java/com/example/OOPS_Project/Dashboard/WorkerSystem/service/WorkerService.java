package com.example.OOPS_Project.Dashboard.WorkerSystem.service;

import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.*;
import com.example.OOPS_Project.Dashboard.WorkerSystem.model.AssignServiceDetail;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface WorkerService {
    public List<Worker> getAllworkers();
    public Worker saveworker(Worker worker);
    public Worker get(Integer id);
    public void delete(Integer id);
    public void work(AssignServiceDetail assignServiceDetail);


}
