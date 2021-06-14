package org.server.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.itextpdf.text.DocumentException;
import org.bson.types.Binary;
import org.server.entity.*;
import org.server.exceptions.EntityNotFound;
import org.server.service.DocumentFilesService;
import org.server.service.MembershipFormService;
import org.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/membership")
public class MembershipController {

    @Autowired
    public  UserService userService;

    @Autowired
    public MembershipFormService membershipFormService;

    @Autowired
    public DocumentFilesService documentFilesService;


    @PostMapping(path="/preAccept")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public ResponseEntity<?> answerRequest(HttpServletRequest req, @RequestBody answerMembershipRequest a, HttpServletResponse response ) throws IOException, DocumentException {
        if(UserState.valueOf(a.answer) == UserState.ACCEPTED){
             Binary document = userService.preAcceptUser(req, a.user, a.role,a.numberMembership,a.numberDocumentHeadSociety,
                    a.numberDocumentMember,a.dateAcceptance,response);
            Resource resource = new ByteArrayResource(document.getData());
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(resource);
        }
        else throw new EntityNotFound();

    }

    @PostMapping(path="/reject")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public ResponseEntity<?> rejectRequest(HttpServletRequest req, @RequestBody answerMembershipRequest a ) {
         if (UserState.valueOf(a.answer) == UserState.REJECTED){
            userService.rejectUser(a.user);
        }
        else throw new EntityNotFound();
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Request membership successful"));
    }

    @PostMapping(path = "/accept/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public ResponseEntity<?> acceptUser(@RequestParam (name = "file") MultipartFile file, Model model, @PathVariable (name = "id") String id) throws IOException, DocumentException {
        userService.confirmUser(id, file);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "User accepted successfully"));
    }

    @GetMapping(path ="/")
    @PreAuthorize("hasRole('ROLE_NEW')")
    public MembershipForm getMembershipForm(HttpServletRequest request){
        User user = userService.getCurrentUser(request);
        return membershipFormService.getMembershipFormByOwner(user.getEmail());
    }

    @GetMapping(path = "/generatepdf")
    @ResponseBody
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY', 'NEW')")
    public void generatePDF(HttpServletRequest req, HttpServletResponse response) throws IOException, DocumentException {
        response.setContentType("application/pdf");
        userService.generateMembershipPdf( response, req);

    }

    @GetMapping(path="/exist")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_NEW')")
    public ResponseEntity<?> membershipFormExists(HttpServletRequest req){

        Boolean canMakeRequest = membershipFormService.canMakeRequest(req);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Membership form exists"));

    }

    @GetMapping(path = "/request")
    @PreAuthorize("hasRole('ROLE_NEW')")
    @ResponseBody
    public ResponseEntity<?> requestMembership(HttpServletRequest req){

        userService.requestMembership(req);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Request membership succesful"));
    }

    @PostMapping( path = "/uploadForm")
    @PreAuthorize("hasAnyRole('USER','EXTRAORDINARY', 'NEW')")
    @ResponseBody
    public ResponseEntity<?> uploadMembershipForm(HttpServletRequest req, @RequestBody membershipForm m){
        userService.creataUpdateMembershipForm(req,m.informationPromoter1, m.informationPromoter2, m.placeOfWork,
                m.addressPlaceOfWork, m.position, m.university, m.faculty, m.fieldOfStudy, m.yearGraduation, m.universityTitle,
                m.diplomaNumberPsychologist, m.speciality, m.gradeOfSpeciality, m.yearSpeciality, m.specialInterestsPsychology);
        return ResponseEntity.ok(new org.server.entity.ApiResponse(true, "Membership information saved"));
    }

    static class membershipForm{

        public String informationPromoter1;
        public String informationPromoter2;
        public String placeOfWork;
        public String addressPlaceOfWork;
        public String position;
        public String university;
        public String faculty;
        public String fieldOfStudy;
        public String yearGraduation;
        public String universityTitle;
        public String diplomaNumberPsychologist;
        public String speciality;
        public String gradeOfSpeciality;
        public String yearSpeciality;
        public String specialInterestsPsychology;
    }

    static class answerMembershipRequest{

        @NotNull
        public String answer;

        @NotNull
        public String user;

        public String dateAcceptance;

        public String numberMembership;

        public String numberDocumentHeadSociety;

        public String numberDocumentMember;

        public String role;
    }




}
