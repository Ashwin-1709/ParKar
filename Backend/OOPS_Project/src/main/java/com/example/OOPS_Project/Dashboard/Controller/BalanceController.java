package com.example.OOPS_Project.Dashboard.Controller;

import com.example.OOPS_Project.Dashboard.Model.BookingDetail;
import com.example.OOPS_Project.Dashboard.Services.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BalanceController
{
    @Autowired
    BalanceService balanceService;

    @PostMapping("/balance/{username}")
    public String getUserBalance(@PathVariable String username)
    {
        return balanceService.getBalance(username);
    }

    @PostMapping("/userbookings/{username}")
    public ResponseEntity<List<BookingDetail>> getAllUserBooking(@PathVariable String username)
    {
        List<BookingDetail> bookingDetails = balanceService.userBookking(username);
        return ResponseEntity.ok(bookingDetails);
    }

    @PostMapping("/balance/{username}/add/{amount}")
    public void AddWallet(@PathVariable String username , @PathVariable Long amount)
    {
        balanceService.addBalance(username,amount);
    }

}
