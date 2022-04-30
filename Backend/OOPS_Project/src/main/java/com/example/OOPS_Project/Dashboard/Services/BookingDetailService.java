package com.example.OOPS_Project.Dashboard.Services;

import com.example.OOPS_Project.Dashboard.Dao.BookingDataRepository;
import com.example.OOPS_Project.Dashboard.Database.BookingData;
import com.example.OOPS_Project.Dashboard.Model.ConfirmBookInfo;
import com.example.OOPS_Project.Dashboard.Model.DateTimeModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingDetailService {

    @Autowired
    private BookingDataRepository bookingDataRepository;

    public List<ConfirmBookInfo> SendBookingDetail()
    {
        List<BookingData> bookingDataList = bookingDataRepository.findAll();
        List<ConfirmBookInfo> confirmBookInfos = new ArrayList<ConfirmBookInfo>();
        for(BookingData bookingData:bookingDataList)
        {
            DateTimeModel dateTimeModel = new DateTimeModel(bookingData.getDateTime().getInTime(),bookingData.getDateTime().getOutTime());
            ConfirmBookInfo confirmBookInfo = new ConfirmBookInfo(bookingData.getAppUser().getUsername(),bookingData.getParkingSpace(),dateTimeModel);
            confirmBookInfos.add(confirmBookInfo);
        }
        return confirmBookInfos;
    }
}
