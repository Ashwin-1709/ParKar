package com.example.OOPS_Project.ConfirmationLinkID.javaMailIO;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class MailVerification {

    private JavaMailSender javaMailSender;
    public void sendMail(String user , String message )
    {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(user);
        msg.setText(message);
        msg.setSubject("Verification Link");
        msg.setFrom("developersendermail@gmail.com");
        javaMailSender.send(msg);

    }

}
