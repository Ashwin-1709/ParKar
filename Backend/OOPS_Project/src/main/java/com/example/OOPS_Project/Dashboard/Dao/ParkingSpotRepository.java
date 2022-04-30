package com.example.OOPS_Project.Dashboard.Dao;


import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParkingSpotRepository extends JpaRepository<ParkingSpot,Integer>
{
    List<ParkingSpot> findByParkingSpace(ParkingSpace parkingSpace);


}

