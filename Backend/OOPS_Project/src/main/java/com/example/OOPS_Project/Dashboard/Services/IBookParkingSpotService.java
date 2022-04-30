package com.example.OOPS_Project.Dashboard.Services;


import com.example.OOPS_Project.Dashboard.Model.BookInfo;

public interface IBookParkingSpotService
{
    int noOfAvailable(BookInfo bookInfo);

    void bookSpot(BookInfo bookInfo);

}
