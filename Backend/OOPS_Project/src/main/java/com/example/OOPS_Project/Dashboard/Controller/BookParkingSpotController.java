package com.example.OOPS_Project.Dashboard.Controller;


import com.example.OOPS_Project.Dashboard.Model.BookInfo;
import com.example.OOPS_Project.Dashboard.Model.ConfirmBookInfo;
import com.example.OOPS_Project.Dashboard.Services.BookParkingSpotService;
import org.json.simple.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(path="/book")
public class BookParkingSpotController
{
    @Autowired
    BookParkingSpotService bookParkingSpotService;

    @PostMapping("/avialablespot")
    public ResponseEntity<Integer> bookSpace(@RequestBody BookInfo bookInfo){
        int freeSpots= bookParkingSpotService.noOfAvailable(bookInfo);
        return ResponseEntity.ok(freeSpots);
    }
    @PostMapping("/confirm")
    public String confirmBooking(@RequestBody ConfirmBookInfo bookInfo)
    {
        bookParkingSpotService.bookSpot(bookInfo);
        Map obj = new HashMap();
        obj.put("status","Booking Confirmed");
        String BookingStatus = JSONValue.toJSONString(obj);
        return BookingStatus;
    }


}
