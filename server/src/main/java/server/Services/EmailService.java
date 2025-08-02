package server.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sentWelcomeEmail(String toEmail, String name){
        SimpleMailMessage massage = new SimpleMailMessage();
        massage.setFrom(fromEmail);
        massage.setTo(toEmail);
        massage.setSubject("Welcome to our Platform");
        massage.setText("Hello "+name+", \n\n Thanks for registering with us!\n\nRegards, MyNoteShare");
        mailSender.send(massage);    
    }


    public void sentResetOtpEmail(String toEmail, String otp){
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom(fromEmail);
      message.setTo(toEmail);
      message.setSubject("Password Reset OTP");
      message.setText("Your OTP for reseting your password is "+otp+".\n\n Use this OTP to proceed with resetting your password");
      mailSender.send(message);
    }
  
    public void sendOtpMail(String toEmail, String otp){
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom(fromEmail);
      message.setTo(toEmail);
      message.setSubject("Account Verification OTP");
      message.setText("Your OTP is "+otp+". Verify your account using this OTP.");
      mailSender.send(message);
    }
    
}
