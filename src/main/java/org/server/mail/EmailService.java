package org.server.mail;

public interface EmailService {

    void sendSimpleMessage(String to,
                           String subject,
                           String text);


    void sendSimpleMessageResetPassword(String to,
                                    String subject,
                                    String token);

    void sendSimpleMessageVerificationEmail(String to,
                                            String subject,
                                            String token);
}
