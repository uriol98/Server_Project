package org.server.repository;

import org.server.entity.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.Optional;


import java.util.ArrayList;

@Component
public interface UserRepository extends MongoRepository<User,String> {

    Optional<User> findByEmail(@Param("email") String email);



}
