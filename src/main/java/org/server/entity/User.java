package org.server.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@Document
public class User implements Serializable {

    @Id
    private String _id;

    @NotNull
    @Size(min=2, max=18)
    private String username;

    private String imageUrl;

    private Boolean emailVerified = false;

    @NotNull
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateOfBirth;

    @NotNull
    @Size(min=5, max=30)
    private String password;

    @Email
    @NotNull
    private String email;

    @NotNull
    @Max(20)
    private  String name;

    @NotNull
    @Max(50)
    private  String surname;

    @NotNull
    private String nationality;

    @NotNull
    private AuthProvider provider;

    private String providerId;

    public String getId() {
        return _id;
    }

    public User(){ }

    public User(String username, String password, String email,String name, String surname, String nationality , LocalDate dateOfBirth ){
        this.username = username;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.email = email;
        this.nationality = nationality;
        this.name = name;
        this.surname = surname;
    }

    //@JsonView (Views.Private.class)
    public String getUsername(){
        return username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

}
