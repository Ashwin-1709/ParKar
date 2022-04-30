package com.example.OOPS_Project.Dashboard.Model;


import com.example.OOPS_Project.Dashboard.Database.ParkingSpace;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class BookInfo
{
    private String username;
    private ParkingSpace parkingSpace;
    private com.example.OOPS_Project.Dashboard.Model.DateTimeModel dateTimeModel;
}
