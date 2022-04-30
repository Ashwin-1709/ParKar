package com.example.OOPS_Project.UserApp;
import com.example.OOPS_Project.ConfirmationLinkID.Auth_ID;
import com.example.OOPS_Project.ConfirmationLinkID.ID_save;
import com.example.OOPS_Project.Dashboard.Dao.BalanceRepository;
import com.example.OOPS_Project.Dashboard.Database.Balance;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    private final static BCryptPasswordEncoder store_encoded_pass = new BCryptPasswordEncoder();

    private UserRepository repo;

    final ID_save id_save;

    private BalanceRepository balanceRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return repo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

        public String Register_user(AppUser appUser){
        if(repo.findByEmail(appUser.getEmail()).isPresent()){
            throw new IllegalStateException("email linked to a user");
        }

        String toStore = store_encoded_pass.encode(appUser.getPassword());

        appUser.setPassword(appUser.getPassword());
        String tok = UUID.randomUUID().toString();
        Auth_ID id = new Auth_ID(
            tok,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        id_save.saveID(id);

        repo.save(appUser);

        balanceRepository.save(new Balance(appUser , 2000L));

        return tok;
    }

    public String newAdmin(AppUser appUser)
    {
        appUser.setEnabled(true);
        repo.save(appUser);
        return "Admin credentials added";
    }


    public int enableAccount (String s)
    {
        return repo.enableAppUser(s);
    }
}
