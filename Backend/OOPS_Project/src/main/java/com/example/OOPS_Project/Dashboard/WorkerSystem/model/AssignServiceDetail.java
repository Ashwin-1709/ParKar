package com.example.OOPS_Project.Dashboard.WorkerSystem.model;

import com.example.OOPS_Project.Dashboard.Model.ConfirmBookInfo;
import com.example.OOPS_Project.Dashboard.WorkerSystem.Database.Service;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AssignServiceDetail
{
    private List<Service> services;
    private ConfirmBookInfo confirmBookInfo;
}
