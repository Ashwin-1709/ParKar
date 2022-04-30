package com.example.OOPS_Project.Dashboard.Controller;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import com.example.OOPS_Project.Dashboard.Services.AdminService;
import com.example.OOPS_Project.Dashboard.Services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class ParkingSpaceController
{
    @Autowired
    SearchService searchService;
    @Autowired
    AdminService adminService;

    @PostMapping("/savespace/parkingspace")
    public void saveParkingSpace(@RequestBody ParkingSpace parkingSpace)
    {
        adminService.addParkingSpace(parkingSpace);
    }

    @PostMapping("/deletespace/parkingspace")
    public void deleteParkingSpace(@RequestBody List<ParkingSpace> parkingSpaces)
    {
        adminService.deleteSpace(parkingSpaces);
    }

}
