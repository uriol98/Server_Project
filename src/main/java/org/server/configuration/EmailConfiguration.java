package org.server.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;


@Configuration
@ComponentScan(basePackages = { "org.server.mail" })
@ConfigurationProperties(prefix = "mail")
public class EmailConfiguration {


    @Value("${mail.host}")
    private String mailServerHost;

    @Value("${mail.port}")
    private Integer mailServerPort;

    @Value("${mail.username}")
    private String mailServerUsername;

    @Value("${mail.password}")
    private String mailServerPassword;

    @Value("${mail.properties.mail.smtp.auth}")
    private String mailServerAuth;

    @Value("${mail.properties.mail.smtp.starttls.enable}")
    private String mailServerStartTls;



    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(mailServerHost);
        mailSender.setPort(mailServerPort);

        mailSender.setUsername(mailServerUsername);
        mailSender.setPassword(mailServerPassword);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", mailServerAuth);
        props.put("mail.smtp.starttls.enable", mailServerStartTls);
        props.put("mail.debug", "true");

        return mailSender;
    }

    @Bean
    public SimpleMailMessage templateSimpleMessage() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText("This is the test email template for your email:\n%s\n");
        return message;
    }
}
