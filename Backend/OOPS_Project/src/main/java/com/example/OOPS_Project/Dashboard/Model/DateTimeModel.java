package com.example.OOPS_Project.Dashboard.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class DateTimeModel
{
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime inTime;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDateTime outTime;
}
