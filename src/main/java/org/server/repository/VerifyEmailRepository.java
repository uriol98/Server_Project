package org.server.repository;

import org.server.entity.VerifyEmailEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface VerifyEmailRepository extends MongoRepository<VerifyEmailEntity,String> {

    Optional<VerifyEmailEntity> findByEmail(@Param("email") String email);

    Optional<VerifyEmailEntity> findByToken(@Param("token") String token);
}
