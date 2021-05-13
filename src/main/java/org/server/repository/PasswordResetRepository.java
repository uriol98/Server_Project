package org.server.repository;


import org.server.entity.PasswordReset;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface PasswordResetRepository extends MongoRepository<PasswordReset,String> {

    Optional<PasswordReset> findByEmail(@Param("email") String email);

    Optional<PasswordReset> findByToken(@Param("token") String token);
}
