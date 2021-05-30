package org.server.controller;

import org.server.entity.DocumentFiles;
import org.server.service.DocumentFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Base64;
import java.util.Collection;

@Controller
public class DocumentFileController {

    @Autowired
    DocumentFilesService documentFilesService;


    // REVISAR SI FA FALTA
    @GetMapping("/documents/{id}")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public String getDocument(@PathVariable String id, Model model) {
        DocumentFiles documentFiles = documentFilesService.getDocumentFile(id);
        model.addAttribute("title", documentFiles.getTitle());
        model.addAttribute("image", Base64.getEncoder().encodeToString(documentFiles.getFile().getData()));
        return "documents";
    }

    @PostMapping("/documents/add")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY')")
    public ResponseEntity<?> addFile(@RequestParam (name = "file") MultipartFile file, Model model, HttpServletRequest req) throws IOException {
        documentFilesService.addDocumentFile(req, file);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Profile image updated"));
    }

    @GetMapping("/documents")
    @PreAuthorize("hasRole('ADMIN')")
    public Collection<DocumentFiles> getDocuments(){
        return documentFilesService.getAllDocuments();
    }
}
