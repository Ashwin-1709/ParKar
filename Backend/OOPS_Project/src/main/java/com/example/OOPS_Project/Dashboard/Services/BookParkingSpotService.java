package com.example.OOPS_Project.Dashboard.Services;

import com.example.OOPS_Project.Dashboard.Dao.*;
import com.example.OOPS_Project.Dashboard.Database.*;
import com.example.OOPS_Project.Dashboard.MailSender.BookingMail;
import com.example.OOPS_Project.Dashboard.Model.BookInfo;
import com.example.OOPS_Project.Dashboard.Model.ConfirmBookInfo;
import com.example.OOPS_Project.Dashboard.Model.DateTimeModel;
import com.example.OOPS_Project.UserApp.AppUser;
import com.example.OOPS_Project.UserApp.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookParkingSpotService
{
    @Autowired
    ParkingSpaceRepository parkingSpaceRepository;

    @Autowired
    ParkingSpotRepository parkingSpotRepository;

    @Autowired
    BalanceRepository balanceRepository;

    @Autowired
    DateTimeRepository dateTimeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookingDataRepository bookingDataRepository;

    @Autowired
    BookingMail bookingMail;



    public int noOfAvailable(BookInfo bookInfo)
    {
//        List<ParkingSpot> parkingSpots=bookInfo.getParkingSpace().getParkingSpot();
        String location = bookInfo.getParkingSpace().getLocation();
//        if() return 0;
        List<ParkingSpot> parkingSpots = parkingSpotRepository.findByParkingSpace(parkingSpaceRepository.findParkingSpaceByLocation(location));
        DateTimeModel requiredDateTime = bookInfo.getDateTimeModel();
        int freeSpots=0;
        for(ParkingSpot parkingSpot: parkingSpots)
        {
            List<DateTime> dateTimes = parkingSpot.getDateTime();
            boolean booked = false;
            for(DateTime dateTime:dateTimes)
            {
                if((requiredDateTime.getInTime().isAfter(dateTime.getInTime()) && requiredDateTime.getInTime().isBefore(dateTime.getOutTime()))
                        || (requiredDateTime.getOutTime().isAfter(dateTime.getInTime()) && requiredDateTime.getOutTime().isBefore(dateTime.getOutTime()))
                        || (requiredDateTime.getOutTime().equals(dateTime.getOutTime())) || (requiredDateTime.getInTime().equals(dateTime.getInTime()))
                )
                {
                    booked = true;
                }
            }
            if(!booked) freeSpots++;
        }
//
        return freeSpots;
    }

    public void bookSpot(ConfirmBookInfo confirmBookInfo)
    {
        List<ParkingSpot> parkingSpots = parkingSpotRepository.findByParkingSpace(confirmBookInfo.getParkingSpace());
        DateTimeModel requiredDateTime = confirmBookInfo.getDateTimeModel();
        int freeSpots=0;
        for(ParkingSpot parkingSpot: parkingSpots)
        {
            List<DateTime> dateTimes = parkingSpot.getDateTime();
            for(DateTime datetimeprint:dateTimes) System.out.println(datetimeprint.getInTime());
            boolean booked = false;
            for(DateTime dateTime:dateTimes)
            {
                if((requiredDateTime.getInTime().isAfter(dateTime.getInTime()) && requiredDateTime.getInTime().isBefore(dateTime.getOutTime()))
                        || (requiredDateTime.getOutTime().isAfter(dateTime.getInTime()) && requiredDateTime.getOutTime().isBefore(dateTime.getOutTime()))
                        || (requiredDateTime.getOutTime().equals(dateTime.getOutTime())) || (requiredDateTime.getInTime().equals(dateTime.getInTime()))
                )
                {
                    booked = true;

                }


            }
            if(!booked)
            {
                freeSpots++;
                List<DateTime> dateTimeList = parkingSpot.getDateTime();

                DateTime dateTime=new DateTime();
                LocalDateTime inTime = requiredDateTime.getInTime();
                LocalDateTime outTIme = requiredDateTime.getOutTime();
                dateTime.setOutTime(requiredDateTime.getOutTime());
                dateTime.setInTime(requiredDateTime.getInTime());
                List<DateTime> dateTimeList1 = dateTimeRepository.findDateTimeByInTimeAndOutTime(inTime,outTIme);
                System.out.println(dateTimeList1.size());

                if(dateTimeList1.isEmpty()) {
                    dateTimeRepository.save(dateTime);
//                    System.out.println("111111111111111111111111111ukjDSFjm");
                    dateTimeList.add(dateTime);

                }else dateTimeList.add(dateTimeList1.get(0));
//                System.out.println("ParkingSpot"+parkingSpot.getId());
                parkingSpot.setDateTime(dateTimeList);

                parkingSpotRepository.save(parkingSpot);
//                System.out.println("Booked");
                AppUser appUser = userRepository.getAppUserByUsername(confirmBookInfo.getUsername());

                BookingData bookingData= new BookingData(appUser,dateTime,parkingSpot.getParkingSpace());
                if(dateTimeList1.isEmpty()) bookingDataRepository.save(bookingData);
                else bookingDataRepository.save(new BookingData(appUser,dateTimeList1.get(0),parkingSpot.getParkingSpace()));

                Long totalDeductions;
                long hours = ChronoUnit.HOURS.between(dateTime.getInTime() , dateTime.getOutTime());
                totalDeductions = 100 + 25*hours;
                long amt = totalDeductions;
                Balance UserBalance = balanceRepository.findBalance(appUser);
                totalDeductions = UserBalance.getBalance() - totalDeductions;
                if(totalDeductions > UserBalance.getBalance())
                {
                    throw new IllegalStateException("Not balance");
                }
                balanceRepository.UpdateBalance(totalDeductions , appUser);
                bookingMail.SendBookingMail(appUser.getEmail() , amt );

                return;
            }
        }
        if(freeSpots==0)
        {
            throw new IllegalStateException("This space is already gone!");
        }
//        System.out.println(freeSpots);
    }


}
