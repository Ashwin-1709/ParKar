package com.example.OOPS_Project.ConfirmationLinkID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
@Repository
public interface ID_Storage extends JpaRepository<Auth_ID , Long> {
    Optional<Auth_ID>findByAuthtoken(String authtoken);

    @Transactional
    @Modifying
    @Query("update Auth_ID a" + " set a.auth_time = ?2 " + "where a.authtoken = ?1") int updateAuth_time(String s , LocalDateTime auth_time);

}
