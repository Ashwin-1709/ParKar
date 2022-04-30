package com.example.OOPS_Project.Dashboard.Database;

import com.example.OOPS_Project.UserApp.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="booking_data")
public class BookingData
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade=CascadeType.ALL)
    private AppUser appUser;

    @OneToOne(cascade=CascadeType.ALL)
    private DateTime dateTime;

    @OneToOne(cascade=CascadeType.ALL)
    private ParkingSpace parkingSpace;


    public BookingData(AppUser appUser, DateTime dateTime, ParkingSpace parkingSpace) {
        this.appUser = appUser;
        this.dateTime = dateTime;
        this.parkingSpace=parkingSpace;
    }
}
