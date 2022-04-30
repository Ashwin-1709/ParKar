package com.example.OOPS_Project.Dashboard.Services;

import com.example.OOPS_Project.Dashboard.Dao.ParkingSpaceRepository;
import com.example.OOPS_Project.Dashboard.Dao.ParkingSpotRepository;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService
{
    @Autowired
    ParkingSpaceRepository parkingSpaceRepository;

    @Autowired
    ParkingSpotRepository parkingSpotRepository;

    public void addParkingSpace(ParkingSpace parkingSpace)
    {
        if(parkingSpaceRepository.getParkingSpaceByLocation(parkingSpace.getLocation())!=null) throw new IllegalStateException("Location Already Exists");
        parkingSpaceRepository.save(parkingSpace);
        for(int i = 0; parkingSpace.getNumberOfSpots()> i; i++)
        {
            ParkingSpot parkingSpot = new ParkingSpot();
            parkingSpot.setParkingSpace(parkingSpace);
            parkingSpotRepository.save(parkingSpot);
        }
    }

    public void deleteSpace(List<ParkingSpace> parkingSpaces)
    {
        for(ParkingSpace parkingSpace:parkingSpaces)
        {
            parkingSpaceRepository.delete(parkingSpaceRepository.findParkingSpaceByLocation(parkingSpace.getLocation()));
        }
    }

}