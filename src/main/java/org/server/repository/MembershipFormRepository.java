package org.server.repository;

import org.server.entity.MembershipForm;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.Optional;

public interface MembershipFormRepository extends MongoRepository<MembershipForm,String> {

    Optional<MembershipForm> findByOwner(@Param("owner") String owner);
}
