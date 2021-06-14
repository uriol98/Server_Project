package org.server.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.itextpdf.text.DocumentException;

import org.bson.types.Binary;
import org.server.entity.DocumentFiles;
import org.server.entity.DocumentType;
import org.server.entity.User;
import org.server.entity.Views;
import org.server.service.DocumentFilesService;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.print.Doc;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.View;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.util.Base64;
import java.util.Collection;

@Controller
@RequestMapping("/documents")
public class DocumentFileController {

    @Autowired
    DocumentFilesService documentFilesService;

    @Autowired
    UserService userService;



    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Resource> getDocument(@PathVariable String id, Model model) throws IOException, DocumentException {
        DocumentFiles documentFiles = documentFilesService.getDocumentFile(id);
        Resource resource = new ByteArrayResource(documentFiles.getFile().getData());

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(resource);
    }

    @GetMapping("/type/{type}")
    @ResponseBody
    public ResponseEntity<Resource> getDocumentByType(HttpServletRequest req, Model model,@PathVariable(name = "type") String type){
        User user = userService.getCurrentUser(req);
        DocumentFiles documentFiles = documentFilesService.getDocumentOwnerType(user.getEmail(),DocumentType.valueOf(type));
        Resource resource = new ByteArrayResource(documentFiles.getFile().getData());
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(resource);
    }

    @PostMapping("/addMembership")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY','NEW')")
    public ResponseEntity<?> addMembership(@RequestParam (name = "file") MultipartFile file, Model model, HttpServletRequest req) throws IOException {
        documentFilesService.addDocumentFile(req, file, DocumentType.NEW_MEMBERSHIP);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Document Uploaded"));
    }

    @PostMapping("/addDiploma")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY','NEW')")
    public ResponseEntity<?> addDiploma(@RequestParam (name = "file") MultipartFile file, Model model, HttpServletRequest req) throws IOException {
        documentFilesService.addDocumentFile(req, file, DocumentType.DIPLOMA);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Document Uploaded"));
    }


    @GetMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @JsonView(Views.Public.class)
    @ResponseBody
    public Collection<DocumentFiles> getDocuments(){
        return documentFilesService.getAllDocuments();
    }

    @PostMapping("/user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    @JsonView(Views.Public.class)
    public Collection<DocumentFiles> getDocumentsUser(@RequestBody Email email, @PathVariable(name = "id") String id){
        return documentFilesService.getDocumentsUser(email.email);
    }

    static class Email{
        @NotNull
        public String email;
    }

    static class Type{
        @NotNull
        public String documentType;
    }
}

