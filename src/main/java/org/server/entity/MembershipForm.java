package org.server.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Data
@Document
public class MembershipForm implements Serializable {


    private String informationPromoter1;
    private String informationPromoter2;
    private String placeOfWork;
    private String addressPlaceOfWork;
    private String position;
    private String university;
    private String faculty;
    private String fieldOfStudy;
    private String yearGraduation;
    private String universityTitle;
    private String diplomaNumberPsychologist;
    private String speciality;
    private String gradeOfSpeciality;
    private String yearSpeciality;
    private String specialInterestsPsychology;

    @Id
    private String owner;
    private String dateAcceptance;
    private String role;
    private String numberMembership;
    private String numberDocumentHeadSociety;
    private String numberDocumentMember;


    public MembershipForm( String informationPromoter1, String informationPromoter2, String placeOfWork, String addressPlaceOfWork,
                           String position,  String university, String faculty, String fieldOfStudy,
                           String yearGraduation, String universityTitle, String diplomaNumberPsychologist, String speciality,
                           String gradeOfSpeciality, String yearSpeciality, String specialInterestsPsychology, String owner){

        this.informationPromoter1 = informationPromoter1;
        this.informationPromoter2 = informationPromoter2;
        this.placeOfWork = placeOfWork;
        this.addressPlaceOfWork = addressPlaceOfWork;
        this.position = position;
        this.university = university;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.yearGraduation = yearGraduation;
        this.universityTitle = universityTitle;
        this.diplomaNumberPsychologist = diplomaNumberPsychologist;
        this.speciality = speciality;
        this.gradeOfSpeciality = gradeOfSpeciality;
        this.yearSpeciality = yearSpeciality;
        this.specialInterestsPsychology = specialInterestsPsychology;
        this.owner = owner;
        this.dateAcceptance = " ";
        this.role = " ";
        this.numberMembership = " ";
        this.numberDocumentHeadSociety = " ";
        this.numberDocumentMember = " ";
    }

    public void update( String informationPromoter1, String informationPromoter2, String placeOfWork, String addressPlaceOfWork,
                        String position,  String university, String faculty, String fieldOfStudy,
                        String yearGraduation, String universityTitle, String diplomaNumberPsychologist, String speciality,
                        String gradeOfSpeciality, String yearSpeciality, String specialInterestsPsychology, String owner){

        this.informationPromoter1 = informationPromoter1;
        this.informationPromoter2 = informationPromoter2;
        this.placeOfWork = placeOfWork;
        this.addressPlaceOfWork = addressPlaceOfWork;
        this.position = position;
        this.university = university;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.yearGraduation = yearGraduation;
        this.universityTitle = universityTitle;
        this.diplomaNumberPsychologist = diplomaNumberPsychologist;
        this.speciality = speciality;
        this.gradeOfSpeciality = gradeOfSpeciality;
        this.yearSpeciality = yearSpeciality;
        this.specialInterestsPsychology = specialInterestsPsychology;
        this.owner = owner;
        this.dateAcceptance = " ";
        this.role = " ";
        this.numberMembership = " ";
        this.numberDocumentHeadSociety = " ";
        this.numberDocumentMember = " ";

    }

    public void acceptMembership(String dateAcceptance, String role, String numberMembership, String numberDocumentHeadSociety,
           String numberDocumentMember){

        this.dateAcceptance = dateAcceptance;
        this.role = role;
        this.numberMembership = numberMembership;
        this.numberDocumentHeadSociety = numberDocumentHeadSociety;
        this.numberDocumentMember = numberDocumentMember;

    }


    public String getInformationPromoter1() { return informationPromoter1;  }
    public String getInformationPromoter2() {  return informationPromoter2; }
    public String getPlaceOfWork() {  return placeOfWork; }
    public String getAddressPlaceOfWork() { return addressPlaceOfWork;  }
    public String getPosition() {  return position; }
    public String getUniversity() {  return university; }
    public String getFaculty() {  return faculty; }
    public String getFieldOfStudy() {  return fieldOfStudy; }
    public String getyearGraduation() {  return yearGraduation; }
    public String getUniversityTitle() {  return universityTitle; }
    public String getDiplomaNumberPsychologist() {  return diplomaNumberPsychologist; }
    public String getSpeciality() { return speciality;  }
    public String getGradeOfSpeciality() {  return gradeOfSpeciality; }
    public String getYearSpeciality() { return yearSpeciality;  }
    public String getSpecialInterestsPsychology() {  return specialInterestsPsychology; }

    public String getOwner() {return owner;}
}
