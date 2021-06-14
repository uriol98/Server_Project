package org.server.PDF;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.*;
import org.bson.types.Binary;
import org.server.entity.MembershipForm;
import org.server.entity.User;


import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDate;

public class PDFGenerator {


    public void generateMembershipPDF(User user, MembershipForm membershipForm, HttpServletResponse response) throws FileNotFoundException, IOException,DocumentException {

        PdfReader reader = new PdfReader("/pdf/pdf_membership_pl_part1.pdf");
        PdfStamper stamper = new PdfStamper(reader, response.getOutputStream());
        AcroFields form = stamper.getAcroFields();
        // ADD fields
        String date = LocalDate.now().toString();
        form.setField("surname", user.getSurname());
        form.setField("name",user.getName());
        form.setField("dateOfBirth",user.getDateOfBirth().toString());
        form.setField("adress",user.getAddress());
        form.setField("email",user.getEmail());
        form.setField("phone",user.getPhoneNumber());
        form.setField("dateCreation",date);
        form.setField("informationPromoter1",membershipForm.getInformationPromoter1());
        form.setField("informationPromoter2",membershipForm.getInformationPromoter2());
        form.setField("placeOfWork",membershipForm.getPlaceOfWork());
        form.setField("position",membershipForm.getPosition());
        form.setField("addressPlaceOfWork",membershipForm.getAddressPlaceOfWork());
        form.setField("university",membershipForm.getUniversity());
        form.setField("faculty",membershipForm.getFaculty());
        form.setField("fieldOfStudy",membershipForm.getFieldOfStudy());
        form.setField("yearGraduation",membershipForm.getyearGraduation());
        form.setField("universityTitle",membershipForm.getUniversityTitle());
        form.setField("diplomaNumberPsychologist",membershipForm.getDiplomaNumberPsychologist());
        form.setField("speciality",membershipForm.getSpeciality());
        form.setField("gradeOfSpeciality",membershipForm.getGradeOfSpeciality());
        form.setField("yearSpeciality",membershipForm.getYearSpeciality());
        form.setField("specialInterestsPsychology",membershipForm.getSpecialInterestsPsychology());
        form.setField("dateCreation",date);
        stamper.setFormFlattening(true);
        stamper.close();
        reader.close();
    }

    public Binary confirmMembership( String surname, String name,String dateAcceptance, String  role,
                                  String numberMembership, String numberDocumentHeadSociety, String numberDocumentMember) throws IOException, DocumentException {

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        PdfReader reader = new PdfReader("\\pdf\\pdf_membership_pl_part2.pdf");
        PdfStamper stamper = new PdfStamper(reader, stream);
        AcroFields form = stamper.getAcroFields();
        form.setField("surname", surname);
        form.setField("name", name);
        form.setField("dateAcceptance",dateAcceptance);
        form.setField("role", role);
        form.setField("numberMembership", numberMembership);
        form.setField("numberDocumentHeadSociety", numberDocumentHeadSociety);
        form.setField("numberDocumentMember", numberDocumentMember);
        stamper.setFormFlattening(true);
        stamper.close();
        reader.close();
        Binary document = new Binary(stream.toByteArray());
        stream.close();
        return document;
    }

    public Binary generateConfirmationDocument( String surname, String name,String dateAcceptance, String  role,
                                      String numberDocumentHeadSociety, String numberDocumentMember) throws IOException, DocumentException {

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        PdfReader reader = new PdfReader("\\pdf\\membership_confirmation_pl.pdf");
        PdfStamper stamper = new PdfStamper(reader, stream);
        AcroFields form = stamper.getAcroFields();
        form.setField("surname", surname);
        form.setField("name", name);
        form.setField("dateAcceptance",dateAcceptance);
        //form.setField("role", role);
        form.setField("numberDocumentHeadSociety", numberDocumentHeadSociety);
        form.setField("numberDocumentMember", numberDocumentMember);
        stamper.setFormFlattening(true);
        stamper.close();
        reader.close();
        Binary document = new Binary(stream.toByteArray());
        stream.close();
        return document;
    }


    public Binary mergePdfFiles(Binary pdf1, Binary pdf2) throws IOException, DocumentException {

        Document document = new Document();

        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        PdfReader reader1 = new PdfReader(pdf1.getData());
        PdfReader reader2 = new PdfReader(pdf2.getData());
        PdfCopy copy = new PdfCopy(document,stream);
        document.open();
        copy.addPage(copy.getImportedPage(reader1,1));
        copy.freeReader(reader1);
        reader1.close();
        copy.addPage(copy.getImportedPage(reader2,1));
        copy.freeReader(reader2);
        reader2.close();
        document.close();
        Binary byteArray = new Binary(stream.toByteArray());
        stream.close();
        return byteArray;
    }



}
