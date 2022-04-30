package com.example.OOPS_Project.Dashboard.Model;

import com.example.OOPS_Project.Dashboard.Database.DateTime;
import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class BookingDetail {
    ParkingSpace parkingSpace;
    DateTime dateTime;
    long cost;
}
