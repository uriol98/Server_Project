package org.server.service;


import org.server.entity.DocumentFiles;
import org.server.entity.DocumentType;
import org.server.entity.MembershipForm;
import org.server.entity.User;
import org.server.exceptions.EntityNotFound;
import org.server.repository.MembershipFormRepository;
import org.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public class MembershipFormService {


    @Autowired
    MembershipFormRepository membershipFormRepository;

    @Autowired
    UserService userService;

    @Autowired
    DocumentFilesService documentFilesService;

    public MembershipFormRepository crud(){
        return membershipFormRepository;
    }

    public MembershipForm getMembershipFormByOwner(String owner){
        Optional<MembershipForm> m = membershipFormRepository.findByOwner(owner);
        if(! m.isPresent()) throw new EntityNotFound();
        return m.get();
    }

    public void saveMembershipForm(MembershipForm membershipForm){
        membershipFormRepository.save(membershipForm);
    }

    public boolean canMakeRequest(HttpServletRequest req){
        User user = userService.getCurrentUser(req);
        MembershipForm membershipForm = getMembershipFormByOwner(user.getEmail());
        DocumentFiles documentFiles = documentFilesService.getDocumentOwnerType(user.getEmail(), DocumentType.NEW_MEMBERSHIP);
        if (documentFiles == null) throw new EntityNotFound();
        return true;
    }

    public void createUpdateMembershipForm(User user, String informationPromoter1, String informationPromoter2, String placeOfWork, String addressPlaceOfWork,
                                           String position, String university, String faculty, String fieldOfStudy,
                                           String yearGraduation, String universityTitle, String diplomaNumberPsychologist, String speciality,
                                           String gradeOfSpeciality, String yearSpeciality, String specialInterestsPsychology){

        Optional<MembershipForm> m = membershipFormRepository.findByOwner(user.getEmail());
        MembershipForm membershipForm;
        if(m.isPresent()){
            membershipForm = m.get();
            membershipForm.update(informationPromoter1,informationPromoter2,placeOfWork,addressPlaceOfWork,position,university,faculty,
                    fieldOfStudy,yearGraduation,universityTitle,diplomaNumberPsychologist,speciality,gradeOfSpeciality,yearSpeciality,specialInterestsPsychology,user.getEmail());

        }
        else{
            membershipForm = new MembershipForm(informationPromoter1,informationPromoter2,placeOfWork,addressPlaceOfWork,position,university,faculty,
                    fieldOfStudy,yearGraduation,universityTitle,diplomaNumberPsychologist,speciality,gradeOfSpeciality,yearSpeciality,specialInterestsPsychology,user.getEmail());

        }
        membershipFormRepository.save(membershipForm);
    }
}
