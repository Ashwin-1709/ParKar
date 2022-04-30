package com.example.OOPS_Project.Dashboard.Services;

import com.example.OOPS_Project.Dashboard.Dao.BalanceRepository;
import com.example.OOPS_Project.Dashboard.Dao.BookingDataRepository;
import com.example.OOPS_Project.Dashboard.Database.Balance;
import com.example.OOPS_Project.Dashboard.Database.BookingData;
import com.example.OOPS_Project.Dashboard.Database.DateTime;
import com.example.OOPS_Project.Dashboard.Model.BookingDetail;
import com.example.OOPS_Project.UserApp.AppUser;
import com.example.OOPS_Project.UserApp.UserRepository;
import com.nimbusds.jose.shaded.json.JSONValue;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class BalanceService {

    @Autowired
    BalanceRepository balanceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookingDataRepository bookingDataRepository;
    public String getBalance(String username)
    {
        AppUser appUser = userRepository.getAppUserByUsername(username);
        Balance balance = balanceRepository.findBalance(appUser);
        String toSend = balance.getBalance().toString();
        Map obj = new HashMap();
        obj.put(username , toSend);
        String balanceObject = JSONValue.toJSONString(obj);
        return balanceObject;
    }

    public List<BookingDetail> userBookking(String username)
    {
        AppUser appUser = userRepository.getAppUserByUsername(username);
        List<BookingData> bookingDataList = bookingDataRepository.getBookingDataByAppUser(appUser);
        List<BookingDetail> bookingDetails = new ArrayList<BookingDetail>();
        for(BookingData bookingData:bookingDataList)
        {
            DateTime dateTime = bookingData.getDateTime();
//            if(dateTime.getOutTime().isBefore(LocalDateTime.now())) continue;
            Long totalDeductions;
            long hours = ChronoUnit.HOURS.between(dateTime.getInTime() , dateTime.getOutTime());
            totalDeductions = 100 + 25*hours;
            long amt = totalDeductions;
            Balance UserBalance = balanceRepository.findBalance(appUser);
            totalDeductions = UserBalance.getBalance() - totalDeductions;
            BookingDetail bookingDetail = new BookingDetail(bookingData.getParkingSpace(),bookingData.getDateTime(),amt);
            bookingDetails.add(bookingDetail);
        }
        return bookingDetails;
    }

    public void addBalance(String username , Long toAdd)
    {
        AppUser appUser = userRepository.getAppUserByUsername(username);
        Balance balance = balanceRepository.findBalance(appUser);
        Long newBal = balance.getBalance() + toAdd;
        balanceRepository.UpdateBalance(newBal,appUser);
    }
}