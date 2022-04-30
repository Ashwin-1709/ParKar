package com.example.OOPS_Project.Dashboard.MailSender;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BookingMail {
    private JavaMailSender javaMailSender;
    public void SendBookingMail(String user , Long amount)
    {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(user);
        msg.setSubject("Parking slot booking Confirmation");
        String message = "Dear User , Thank you for booking with ParKar Services ! Amount paid -  " + amount;
        msg.setText(message);
        msg.setFrom("developersendermail@gmail.com");
        javaMailSender.send(msg);
    }
}
