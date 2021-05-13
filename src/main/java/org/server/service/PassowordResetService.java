package org.server.service;


import org.server.entity.PasswordReset;
import org.server.exceptions.EntityNotFound;
import org.server.exceptions.InvalidTokenException;
import org.server.repository.PasswordResetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PassowordResetService {


    @Autowired
    private PasswordResetRepository passwordResetRepository;

    public PasswordResetRepository crud(){
        return passwordResetRepository;
    }

    public String generateResetPasswordToken(String email){

        PasswordReset passwordReset = new PasswordReset(email);
        passwordResetRepository.save(passwordReset);
        return passwordReset.getToken();
    }

    public PasswordReset  checkToken(String token){
        Optional<PasswordReset> pr =  passwordResetRepository.findByToken(token);
        if (!pr.isPresent()) throw new EntityNotFound();
        PasswordReset passwordReset = pr.get();
        if (!passwordReset.isTokenValid() || !passwordReset.isActive()) throw new InvalidTokenException();
        return passwordReset;
    }

}
