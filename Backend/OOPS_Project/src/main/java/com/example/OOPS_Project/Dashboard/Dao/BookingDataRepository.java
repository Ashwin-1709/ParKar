package com.example.OOPS_Project.Dashboard.Dao;

import com.example.OOPS_Project.Dashboard.Database.BookingData;
import com.example.OOPS_Project.UserApp.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingDataRepository extends JpaRepository<BookingData,Integer>
{
    List<BookingData> getBookingDataByAppUser(AppUser appUser);
}
