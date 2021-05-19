package org.server.repository;

import org.server.entity.DocumentFiles;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentFilesRepository extends MongoRepository<DocumentFiles,String> {
}
