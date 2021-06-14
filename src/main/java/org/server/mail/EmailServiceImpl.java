package org.server.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service("EmailService")
public class EmailServiceImpl implements EmailService{

    private static final String NOREPLY_ADDRESS = "uri2235@gmail.com";

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SimpleMailMessage template;


    public void sendSimpleMessage(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(NOREPLY_ADDRESS);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }

    public void sendSimpleMessageResetPassword(String to, String subject, String token){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(NOREPLY_ADDRESS);
            message.setTo(to);
            message.setSubject(subject);
            String newLine = System.getProperty("line.separator");
            String textEnglish = "Click on the link to reset your password: https://final-project-148c6.web.app/reset/";
            String textPolish = "Kliknij link, aby zresetować hasło: https://final-project-148c6.web.app/reset/";
            message.setText(textPolish+token+newLine+textEnglish+token);

            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }
    public void sendSimpleMessageVerificationEmail(String to, String subject, String token){
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(NOREPLY_ADDRESS);
            message.setTo(to);
            message.setSubject(subject);
            String newLine = System.getProperty("line.separator");
            String textEnglish = "Click on the link to verify your email: https://final-project-148c6.web.app/verify/";
            String textPolish = "Kliknij link, aby zweryfikować swój adres e-mail: https://final-project-148c6.web.app/verify/";
            message.setText(textPolish+token+newLine+textEnglish+token);
            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }

   public void sendSimpleMessageRequestAnswer(String to, String subject){
       try {
           SimpleMailMessage message = new SimpleMailMessage();
           message.setFrom(NOREPLY_ADDRESS);
           message.setTo(to);
           message.setSubject(subject);
           String newLine = System.getProperty("line.separator");
           String textEnglish = "Click on the link to verify your email: https://final-project-148c6.web.app/verify/";
           String textPolish = "Kliknij link, aby zweryfikować swój adres e-mail: https://final-project-148c6.web.app/verify/";
           message.setText(textPolish+newLine+textEnglish);
           emailSender.send(message);
       } catch (MailException exception) {
           exception.printStackTrace();
       }
    }

}
