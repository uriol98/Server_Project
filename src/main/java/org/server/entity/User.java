package org.server.entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.bson.types.Binary;
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


    private Binary imageUrl;

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
    private String university;

    @NotNull
    private String fieldOfStudy;

    @NotNull
    private int yearGraduation;

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

    public User(String email, String password, String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address, String university, String fieldOfStudy, String yearGraduation ){

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
        this.university = university;
        this.fieldOfStudy = fieldOfStudy;
        if(yearGraduation == "") this.yearGraduation = 0;
        else this.yearGraduation = Integer.parseInt(yearGraduation);
    }


    public void update( String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address, String university, String fieldOfStudy, String yearGraduation){
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.university = university;
        this.fieldOfStudy = fieldOfStudy;
        if(yearGraduation == "") this.yearGraduation = 0;
        else this.yearGraduation = Integer.parseInt(yearGraduation);
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

    public String getUniversity(){ return university;}

    public void setUniversity(String university){ this.university = university;}

    public String getFieldOfStudy(){ return fieldOfStudy;}

    public void setFieldOfStudy(String fieldOfStudy){ this.university = fieldOfStudy;}

    public int getYearGraduation(){ return yearGraduation;}

    public void setYearGraduation(int yearGraduation) { this.yearGraduation = yearGraduation;}

    public void setEmail(String email) {
        this.email = email;
    }

    public Binary getImage() {
        return imageUrl;
    }

    public void setImage(Binary imageUrl) {
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
