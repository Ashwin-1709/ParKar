package com.example.OOPS_Project.Dashboard.Database;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "parking_spot")
public class ParkingSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     int Id;
    @ManyToOne( cascade= CascadeType.ALL)
    private ParkingSpace parkingSpace;
    @ManyToMany( cascade = {
//            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private List<DateTime> dateTime;
}
