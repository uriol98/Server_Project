package org.server.controller;

import org.server.entity.DocumentFiles;
import org.server.service.DocumentFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Controller
public class DocumentFileController {

    @Autowired
    DocumentFilesService documentFilesService;

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
    public String addFile(@RequestParam("title") String title, @RequestParam("file") MultipartFile file, Model model) throws IOException {
        String id = documentFilesService.addDocumentFile(title, file);
        return "redirect:/photos/" + id;
    }
}
