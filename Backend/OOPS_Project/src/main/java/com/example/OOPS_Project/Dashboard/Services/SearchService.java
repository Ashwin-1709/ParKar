package com.example.OOPS_Project.Dashboard.Services;


import com.example.OOPS_Project.Dashboard.Dao.ParkingSpaceRepository;
import com.example.OOPS_Project.Dashboard.Dao.ParkingSpotRepository;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class SearchService implements ISearchService
{
    @Autowired
    ParkingSpaceRepository parkingSpaceRepository;

    @Autowired
    ParkingSpotRepository parkingSpotRepository;


    @Override
    public Set<ParkingSpace> getParkingSpaceList(String location)
    {
        Set<ParkingSpace> parkingSpaces = parkingSpaceRepository.findByLocationStartingWith(location);
        Set<ParkingSpace> parkingSpaces1 = parkingSpaceRepository.findByLocationContaining(location);
//        Set<ParkingSpace> parkingSpaces2
        parkingSpaces.addAll(parkingSpaces1);
        return parkingSpaces;

    }

    @Override
    public List<ParkingSpace> getFullParkingSpaceList()
    {
        return parkingSpaceRepository.findAll();
    }

}
