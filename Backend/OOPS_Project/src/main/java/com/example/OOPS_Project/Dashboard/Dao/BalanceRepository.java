package com.example.OOPS_Project.Dashboard.Dao;

import com.example.OOPS_Project.Dashboard.Database.Balance;
import com.example.OOPS_Project.UserApp.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface BalanceRepository extends JpaRepository<Balance,Long> {

    @Transactional
    @Modifying
    @Query("update Balance b set b.balance = ?1 where b.appUser = ?2")
    void UpdateBalance(long NewBalance , AppUser appUser);

    @Transactional
    @Query("select b from Balance b where b.appUser = ?1")
    Balance findBalance(AppUser appUser);
}
