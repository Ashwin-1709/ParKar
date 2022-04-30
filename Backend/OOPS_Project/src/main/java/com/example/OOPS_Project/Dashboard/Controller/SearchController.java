package com.example.OOPS_Project.Dashboard.Controller;


import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import com.example.OOPS_Project.Dashboard.Services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
      @Autowired
      private SearchService searchService;

//    @GetMapping("/location/{keyword}")
//    @ResponseBody
//    ResponseEntity<Set<ParkingSpace>> fetchLocation(@PathVariable("keyword") String keyword)
//    {
//        Set<ParkingSpace> parkingSpaces = searchService.getParkingSpaceList(keyword);
//        return ResponseEntity.ok(parkingSpaces);
//    }
    @GetMapping("/location/all")
    ResponseEntity<List<ParkingSpace>> fetchLocation()
    {
        List<ParkingSpace> parkingSpaces = searchService.getFullParkingSpaceList();
        return ResponseEntity.ok(parkingSpaces);
    }


}
