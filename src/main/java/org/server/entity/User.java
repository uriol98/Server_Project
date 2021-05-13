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
import java.util.Arrays;
import java.util.List;

@Data
@Document
public class User implements Serializable {

    @Id
    private String _id;


    private String imageUrl;

    private Boolean emailVerified = false;

    @NotNull
    private String gender;

    @NotNull
    private String address;

    @NotNull
    private String phoneNumber;

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

    private boolean active;


    List<Role> roles;

    public String getId() {
        return _id;
    }

    public User(){
        active = false;
        emailVerified = false;
    }

    public User(String email, String password, String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address ){

        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.email = email;
        this.emailVerified =  false;
        this.active = false;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.setRoles(Arrays.asList(Role.ROLE_EXTRAORDINARY));
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname(){ return surname;}

    public void setSutname(String surname){ this.surname = surname;}

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

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public boolean isActive(){ return active; }

    public void setActive(boolean active){ this.active = active; }

    public String getGender(){ return gender; }

    public void setGender(String gender){ this.gender = gender; }

    public String getAddress(){ return address; }

    public void setAddress(String address){ this.address = address; }
}
