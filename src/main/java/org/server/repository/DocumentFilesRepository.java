package org.server.repository;

import org.server.entity.DocumentFiles;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.Collection;
import java.util.Optional;

public interface DocumentFilesRepository extends MongoRepository<DocumentFiles,String> {

    @Query("{ 'owner' : ?0, 'documentType' : ?1 }")
    Optional<DocumentFiles> findByType(@Param("owner") String owner, @Param("documentType") String documentType);

    Collection<DocumentFiles> findByOwner(@Param("owner") String owner);
}
