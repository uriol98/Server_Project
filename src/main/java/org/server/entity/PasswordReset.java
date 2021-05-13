package org.server.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.apache.commons.lang3.RandomStringUtils;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Document
public class PasswordReset implements Serializable {

    @Id
    private String _id;

    @Email
    @NotNull
    private String email;

    @NotNull
    String token;

    @NotNull
    Boolean active;

    @NotNull
    LocalDateTime dateTokenCreation;


    @NotNull
    LocalDateTime dateTokenExpiration;

    public PasswordReset(String email){
        this.email = email;
        this.active = true;
        this.token = RandomStringUtils.randomAlphanumeric(10);
        this.dateTokenCreation = LocalDateTime.now();
        this.dateTokenExpiration = LocalDateTime.now().plusHours(1);
    }

    public boolean isTokenValid(){
        return LocalDateTime.now().isBefore(dateTokenExpiration);
    }

    public String getToken(){ return this.token; }

    public String getEmail() { return  this.email; }

    public LocalDateTime getExpirationDate() { return  this.dateTokenExpiration;}

    public boolean isActive(){ return active;}

    public  void deactivatePasswordReset(){ this.active = false;}

}
