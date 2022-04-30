package com.example.OOPS_Project.Dashboard.Dao;

import com.example.OOPS_Project.Dashboard.Database.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ParkingSpaceRepository extends JpaRepository<ParkingSpace, Integer>
{
    Set<ParkingSpace> findByLocationContaining(String location);
    ParkingSpace getParkingSpaceByLocation(String location);
    Set<ParkingSpace> findByLocationStartingWith(String location);
    ParkingSpace findParkingSpaceByLocation(String location);

    @Override
    List<ParkingSpace> findAll();
}
