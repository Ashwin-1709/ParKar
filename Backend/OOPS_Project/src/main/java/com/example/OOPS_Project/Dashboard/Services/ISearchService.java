package com.example.OOPS_Project.Dashboard.Services;


import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;

import java.util.List;
import java.util.Set;

public interface ISearchService
{
    Set<ParkingSpace> getParkingSpaceList(String location);
    List<ParkingSpace> getFullParkingSpaceList();
}
