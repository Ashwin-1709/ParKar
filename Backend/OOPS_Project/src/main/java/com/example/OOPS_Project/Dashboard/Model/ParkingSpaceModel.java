package com.example.OOPS_Project.Dashboard.Model;


import com.example.OOPS_Project.Dashboard.Database.ParkingSpot;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ParkingSpaceModel
{
    private int id;
    private String location;
    private String numberOfSpots;
    List<ParkingSpot> parkingSpotList;

}
