package com.example.OOPS_Project.Dashboard.WorkerSystem.dto;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Worker;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class ServiceRequest {

    private Worker worker;
}
