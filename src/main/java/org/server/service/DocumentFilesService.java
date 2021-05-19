package org.server.service;


import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.server.entity.DocumentFiles;
import org.server.repository.DocumentFilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class DocumentFilesService {

    @Autowired
    DocumentFilesRepository documentFilesRepository;

    public String addDocumentFile(String title, MultipartFile file) throws IOException {
        DocumentFiles documentFiles = new DocumentFiles(title);
        documentFiles.setFile(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        documentFiles = documentFilesRepository.insert(documentFiles); return documentFiles.getId();
    }

    public DocumentFiles getDocumentFile(String id) {
        return documentFilesRepository.findById(id).get();
    }
}
