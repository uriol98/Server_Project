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
    @Max(20)
    private  String name;

    @NotNull
    @Max(50)
    private  String surname;

    private String numberMembership;

    private String numberDocumentMember;

    private UserState state;

    private String dateAcceptance;

    List<Role> roles;

    public String getId() {
        return _id;
    }

    public User(){
        state = UserState.NEW;
        emailVerified = false;
    }

    public User(String email, String password, String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address){

        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.email = email;
        this.emailVerified =  false;
        this.state = UserState.NEW;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.setRoles(Arrays.asList(Role.ROLE_NEW));
        this.numberDocumentMember = null;
        this.numberMembership = null;
        this.dateAcceptance = "";

    }


    public void update( String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address){
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.address = address;

    }

    public void preAccept (String numberMembership, String numberDocumentMember, String dateAcceptance){
        this.numberMembership = numberMembership;
        this.numberDocumentMember = numberDocumentMember;
        this.dateAcceptance = dateAcceptance;

    }

    public void accept(Role role){
        this.roles.clear();
        this.setRoles(Arrays.asList(role)); }

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

    public UserState getState(){ return state; }

    public void setActive(UserState userState){ this.state = userState; }

    public String getGender(){ return gender; }

    public void setGender(String gender){ this.gender = gender; }

    public String getNumberMembership(){ return numberMembership;}

    public String getNumberDocumentMember() { return numberDocumentMember;}

    public String getDateAcceptance() { return  dateAcceptance; }

    public String getAddress(){ return address; }

    public void setAddress(String address){ this.address = address; }
}
