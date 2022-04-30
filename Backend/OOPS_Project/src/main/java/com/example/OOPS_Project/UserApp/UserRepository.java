package com.example.OOPS_Project.UserApp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<AppUser,Long> {

    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByUsername(String username);

    @Transactional
    @Modifying
    @Query("update AppUser a " +
            "set a.enabled = true where a.email = ?1")
    int enableAppUser(String email);

    @Transactional
    @Query("select u from AppUser u where u.email=:email")
    AppUser findByMail(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("update AppUser a set a.token = ?1 where a.email = ?2")
    void UpdateToken(String token , String email);

    AppUser getAppUserByUsername(String username);

}
