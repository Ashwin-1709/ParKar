package com.example.OOPS_Project.Dashboard.Database;


import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "DateHour")
@NoArgsConstructor
public class DateTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull()
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime inTime;

    @NotNull()
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime outTime;

    public DateTime(LocalDateTime inTime, LocalDateTime outTime) {
        this.inTime = inTime;
        this.outTime = outTime;
    }
}
