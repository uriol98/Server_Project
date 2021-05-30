package org.server.service;


import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.server.entity.DocumentFiles;
import org.server.entity.DocumentType;
import org.server.entity.User;
import org.server.repository.DocumentFilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;

@Service
public class DocumentFilesService {

    @Autowired
    DocumentFilesRepository documentFilesRepository;

    @Autowired
    UserService userService;

    public void addDocumentFile(HttpServletRequest req, MultipartFile file) throws IOException {
        User user = userService.getCurrentUser(req);
        DocumentFiles documentFiles = new DocumentFiles("new_membership_"+user.getName()+"_"+user.getSurname(), DocumentType.NEW_MEMBERSHIP, user.getEmail());
        documentFiles.setFile(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        documentFiles = documentFilesRepository.insert(documentFiles);

    }

    public Collection<DocumentFiles> getAllDocuments(){
        return documentFilesRepository.findAll();
    }

    public DocumentFiles getDocumentFile(String id) {
        return documentFilesRepository.findById(id).get();
    }
}
