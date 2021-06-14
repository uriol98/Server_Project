package org.server.service;


import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.server.entity.DocumentFiles;
import org.server.entity.DocumentType;
import org.server.entity.User;
import org.server.exceptions.EntityNotFound;
import org.server.repository.DocumentFilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@Service
public class DocumentFilesService {

    @Autowired
    DocumentFilesRepository documentFilesRepository;

    @Autowired
    UserService userService;

    @Transactional
    public void addDocumentFile(HttpServletRequest req, MultipartFile file, DocumentType documentType) throws IOException {
        User user = userService.getCurrentUser(req);
        Optional<DocumentFiles> d = documentFilesRepository.findByType(user.getEmail(), documentType.toString());
        if(d.isPresent()){
            DocumentFiles documentFiles = d.get();
            documentFiles.setFile(
                    new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            documentFilesRepository.save(documentFiles);
        }
        else{
            if( documentType == DocumentType.NEW_MEMBERSHIP){
                DocumentFiles documentFiles = new DocumentFiles("new_membership_"+user.getName()+"_"+user.getSurname(), DocumentType.NEW_MEMBERSHIP, user.getEmail());
                documentFiles.setFile(
                        new Binary(BsonBinarySubType.BINARY, file.getBytes()));
                documentFiles = documentFilesRepository.insert(documentFiles);
            }
            else {
                DocumentFiles documentFiles = new DocumentFiles("diploma_"+user.getName()+"_"+user.getSurname(), DocumentType.DIPLOMA, user.getEmail());
                documentFiles.setFile(
                        new Binary(BsonBinarySubType.BINARY, file.getBytes()));
                documentFiles = documentFilesRepository.insert(documentFiles);
            }

        }


    }

    public Collection<DocumentFiles> getDocumentsUser(String email){
        return documentFilesRepository.findByOwner(email);
    }

    public void downloadDocumentByType(HttpServletRequest req, HttpServletResponse response){
        User user = userService.getCurrentUser(req);
    }

    public DocumentFiles getDocumentOwnerType( String owner, DocumentType documentType){
        Optional<DocumentFiles> d = documentFilesRepository.findByType(owner,documentType.toString());
        if(!d.isPresent()) throw new EntityNotFound();
        return  d.get();
    }

    public Collection<DocumentFiles> getAllDocuments(){
        return documentFilesRepository.findAll();
    }

    public DocumentFiles getDocumentFile(String id) {
        Optional<DocumentFiles> d = documentFilesRepository.findById(id);
                if(!d.isPresent()) throw new EntityNotFound();
        return d.get();
    }
}
