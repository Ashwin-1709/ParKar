package com.example.OOPS_Project.Dashboard.Dao;

import com.example.OOPS_Project.Dashboard.Database.DateTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DateTimeRepository extends JpaRepository<DateTime,Integer>
{
    List<DateTime> findDateTimeByInTimeAndOutTime(LocalDateTime inTime, LocalDateTime outTime);
}
