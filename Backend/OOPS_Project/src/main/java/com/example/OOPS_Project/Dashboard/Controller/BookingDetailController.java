package com.example.OOPS_Project.Dashboard.Controller;

import com.example.OOPS_Project.Dashboard.Model.ConfirmBookInfo;
import com.example.OOPS_Project.Dashboard.Services.BookingDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class BookingDetailController {

    @Autowired
    BookingDetailService bookingdetails;
    @PostMapping("bookingdetail")
    public ResponseEntity<List<ConfirmBookInfo>> bookingDetailResponseEntity()
    {
        List<ConfirmBookInfo> bookInfos = bookingdetails.SendBookingDetail();
        return ResponseEntity.ok(bookInfos);
    }
}
