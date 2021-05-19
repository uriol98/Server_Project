package org.server.entity;


import lombok.Data;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Document
public class VerifyEmailEntity implements Serializable {

    @Id
    private String _id;

    @Email
    @NotNull
    private String email;

    @NotNull
    String token;

    public VerifyEmailEntity(String email){
        this.email = email;
        this.token = RandomStringUtils.randomAlphanumeric(10);
    }

    public String getToken(){ return this.token; }

    public String getEmail() { return  this.email; }
}
