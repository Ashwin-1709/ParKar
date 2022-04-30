package com.example.OOPS_Project.Registeration;

import com.example.OOPS_Project.ConfirmationLinkID.Auth_ID;
import com.example.OOPS_Project.ConfirmationLinkID.ID_save;
import com.example.OOPS_Project.ConfirmationLinkID.javaMailIO.MailVerification;
import com.example.OOPS_Project.Dashboard.Dao.BalanceRepository;
import com.example.OOPS_Project.UserApp.AppUser;
import com.example.OOPS_Project.UserApp.AppUserRole;
import com.example.OOPS_Project.UserApp.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final TypeCheck typeCheck;
    private final AppUserService appUserService;
    private ID_save id_save;
    private BalanceRepository balanceRepository;
    //private Functionality functionality;
    //private MailSender mailSender;

    private MailVerification sent_mail;
    public String register(RegistrationRequest request) {

       /*if(!typeCheck.test(request.getEmail())) {
           throw new IllegalStateException("email not valid");
       }*/
       String new_user = appUserService.Register_user(new AppUser(
               request.getFirstname(),
               request.getLastname(),
               request.getUsername(),
               request.getPassword(),
               request.getEmail(),
               request.getReg_id(),
               request.getPhone_num(),
               AppUserRole.USER,
               request.getAddress()
       ));

     String link = "http://localhost:8080/register/confirm?id=" + new_user;
     String message = "Confirmation link - " + link + "\nIt will expire in 15 mins";
     //functionality.sentemail(request.getEmail() , "Confirmation link " + link + "\nIt will expire in 15 mins");
        //mailSender.sendMail(request.getEmail(),message);
        sent_mail.sendMail(request.getEmail(),message);

     return new_user;

    }

    @Transactional
    public String Verify(String auth_verify)
    {
       Auth_ID user_id = id_save.getId(auth_verify).orElseThrow(()-> new IllegalStateException("auth id non-existent"));

       if(user_id.getAuth_time() != null)
       {
           throw new IllegalStateException("authorisation done for the user");
       }
        LocalDateTime final_time = user_id.getExpire_time();

       if(final_time.isBefore(LocalDateTime.now()))
       {
           throw new IllegalStateException("session expired , try again");
       }
       id_save.setAuth_time(auth_verify);

       appUserService.enableAccount(user_id.getAppUser().getEmail());
       return "<script>window.location.href = 'http://localhost:3000/confirmEmail'</script>";
    }

    public String addAdmin(RegistrationRequest request)
    {
        String Admin = appUserService.newAdmin(new AppUser(
                request.getFirstname(),
                request.getLastname(),
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getReg_id(),
                request.getPhone_num(),
                AppUserRole.ADMIN,
                request.getAddress()
        ));

        return Admin;
    }

    public String addWorker(RegistrationRequest request)
    {
        String Worker = appUserService.newAdmin(new AppUser(
                request.getFirstname(),
                request.getLastname(),
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getReg_id(),
                request.getPhone_num(),
                AppUserRole.WORKER,
                request.getAddress()
        ));
        return Worker;
    }


}
