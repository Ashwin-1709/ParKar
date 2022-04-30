package com.example.OOPS_Project.Dashboard.Database;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "parking_space")
public class ParkingSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "locatiion")
    private String location;
    @Column(name = "number_of_spots")
    private int numberOfSpots;

    @JsonIgnore
    @OneToMany(mappedBy = "parkingSpace",orphanRemoval = true,cascade=CascadeType.ALL)
    List<ParkingSpot> parkingSpot;
}
