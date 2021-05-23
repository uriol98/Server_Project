package org.server.mail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
/*import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;*/

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
            message.setText("Click on the link to reset your password: https://finalproject-server.herokuapp.com/reset/"+token);

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
            message.setText("Click on the link to verify your email: https://finalproject-server.herokuapp.com/verify/"+token);

            emailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }

}
