package org.server.service;


import com.itextpdf.text.DocumentException;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.server.PDF.PDFGenerator;
import org.server.entity.*;
import org.server.exceptions.BadCredentialsException;
import org.server.exceptions.EmailAlreadyExistsException;
import org.server.exceptions.EntityNotFound;
import org.server.mail.EmailService;
import org.server.repository.*;
import org.server.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.html.Option;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

   @Autowired
   private PassowordResetService passowordResetService;

    @Autowired
    TokenProvider tokenProvider;

    @Autowired
    private VerifyEmailRepository verifyEmailRepository;

    @Autowired
    EmailService emailService;


    @Autowired
    DocumentFilesRepository documentFilesRepository;

    @Autowired
    DocumentFilesService documentFilesService;

    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @Autowired
    private MembershipFormService membershipFormService;


    public UserRepository crud(){
        return userRepository;
    }

    public String login(String email, String password) throws BadCredentialsException {
            try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            return tokenProvider.createToken(email, userRepository.findByEmail(email).get().getRoles());
            } catch (AuthenticationException ex){
                throw new BadCredentialsException();
            }

    }

    @Transactional
    public User register(String email, String password, String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address) throws EmailAlreadyExistsException {

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent())
            throw new EmailAlreadyExistsException();

        User nu = new User(email, password, name, surname, dateOfBirth, gender, phoneNumber, address);
        VerifyEmailEntity verifyEmailEntity = new VerifyEmailEntity(email);
        verifyEmailRepository.save(verifyEmailEntity);
        userRepository.save(nu);
        emailService.sendSimpleMessageVerificationEmail(email,"Weryfikacja adresu e-mail",verifyEmailEntity.getToken());
        return nu;
    }

    public List<User> getUsers(){
        ArrayList<User> llista = (ArrayList<User>) userRepository.findAll();
        return llista;
    }

    @Transactional
    public String generateResetToken(String email){

        Optional<User> user = userRepository.findByEmail(email);
        if(!user.isPresent()) throw new EntityNotFound();
        String token = passowordResetService.generateResetPasswordToken(email);
        emailService.sendSimpleMessageResetPassword(email,"Zresetuj hasło",token);
        return token;


    }

    @Transactional
    public void changePassword(HttpServletRequest req, String password){
        User user = getCurrentUser(req);
        user.setPassword(password);
        userRepository.save(user);
    }

    @Transactional
    public void changeEmail(HttpServletRequest req, String newEmail){
        User user = getCurrentUser(req);
        user.setEmailVerified(false);
        Optional<User> u = userRepository.findByEmail(newEmail);
        if(u.isPresent()) throw new EmailAlreadyExistsException();
        user.setEmail(newEmail);
        VerifyEmailEntity verifyEmailEntity = new VerifyEmailEntity(newEmail);
        verifyEmailRepository.save(verifyEmailEntity);
        userRepository.save(user);
        emailService.sendSimpleMessageVerificationEmail(newEmail,"Weryfikacja adresu e-mail",verifyEmailEntity.getToken());
    }


    @Transactional
    public void resetPassword(String token, String password){
        PasswordReset pr = passowordResetService.checkToken(token);
        Optional<User> u = userRepository.findByEmail(pr.getEmail());
        User user = u.get();
        user.setPassword(password);
        userRepository.save(user);
        passwordResetRepository.delete(pr);

    }

    public User getCurrentUser(HttpServletRequest req){
        String username = tokenProvider.getUsername(tokenProvider.resolveToken(req));
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new EntityNotFound());
    }

    @Transactional
    public Binary preAcceptUser(HttpServletRequest req, String email, String role, String numberMembership, String numberDocumentHeadSociety,
                           String numberDocumentMember,String dateAcceptance,HttpServletResponse response) throws IOException, DocumentException {
        Optional<User> u = userRepository.findByEmail(email);
        if(!u.isPresent()) throw new EntityNotFound();
        User user = u.get();
        DocumentFiles documentFiles = documentFilesService.getDocumentOwnerType(user.getEmail(), DocumentType.NEW_MEMBERSHIP);
        if(role.equals("EXTRAORDINARY")  || role.equals("NADZWYCZAJNE") )user.preAccept(numberMembership,numberDocumentMember,dateAcceptance);
        else if (role.equals("USER") || role.equals("UŻYTKOWNIK")) user.preAccept(numberMembership,numberDocumentMember,dateAcceptance);
        PDFGenerator pdfGenerator = new PDFGenerator();
        Binary document = pdfGenerator.confirmMembership(user.getSurname(),user.getName(),dateAcceptance,role,numberMembership,numberDocumentHeadSociety,numberDocumentMember );
        Binary finalDocument = pdfGenerator.mergePdfFiles(documentFiles.getFile(),document);
        MembershipForm membershipForm = membershipFormService.getMembershipFormByOwner(email);
        membershipForm.acceptMembership(dateAcceptance,role,numberMembership,numberDocumentHeadSociety,numberDocumentMember);
        membershipFormService.saveMembershipForm(membershipForm);
        userRepository.save(user);
       return  finalDocument;
    }

    @Transactional
    public void confirmUser(String id, MultipartFile file) throws IOException, DocumentException {
        Optional<User> u = userRepository.findById(id);
        if(!u.isPresent()) throw new EntityNotFound();
        User user = u.get();
        user.setState(UserState.ACCEPTED);
        DocumentFiles membershipDeclaration = new DocumentFiles("membership_declaration_"+user.getName()+"_"+user.getSurname(),DocumentType.MEMBERSHIP_DECLARATION,user.getEmail());
        membershipDeclaration.setFile(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));

        MembershipForm membershipForm = membershipFormService.getMembershipFormByOwner(user.getEmail());
        PDFGenerator pdfGenerator = new PDFGenerator();
        Binary confirmationDocument = pdfGenerator.generateConfirmationDocument(user.getSurname(),user.getName(),membershipForm.getDateAcceptance(),membershipForm.getRole(),
                membershipForm.getNumberDocumentHeadSociety(),membershipForm.getNumberDocumentMember());
        DocumentFiles confirmation = new DocumentFiles("confirmation_membership_"+user.getName()+"_"+user.getSurname(),DocumentType.CONFIRM_MEMBERSHIP,user.getEmail());
        confirmation.setFile(confirmationDocument);
        if(membershipForm.getRole().equals("EXTRAORDINARY")  || membershipForm.getRole().equals("NADZWYCZAJNE") )user.accept(Role.ROLE_EXTRAORDINARY);
        else if (membershipForm.getRole().equals("USER") || membershipForm.getRole().equals("UŻYTKOWNIK")) user.accept(Role.ROLE_USER);
        userRepository.save(user);
        emailService.sendSimpleMessageRequestAnswer(user.getEmail(), "Prośba o członkostwo");
        documentFilesRepository.save(membershipDeclaration);
        documentFilesRepository.save(confirmation);
    }

    public Collection<User> getRequests(){
        return userRepository.findByState(UserState.REQUEST);
    }

    @Transactional
    public void rejectUser(String email){
        Optional<User> u = userRepository.findByEmail(email);
        if(!u.isPresent()) throw new EntityNotFound();
        User user = u.get();
        user.setState(UserState.REJECTED);
        userRepository.save(user);
    }

    @Transactional
    public void requestMembership(HttpServletRequest req){
        String username = tokenProvider.getUsername(tokenProvider.resolveToken(req));
        Optional<User> u = userRepository.findByEmail(username);
        User user = u.get();
        user.setState(UserState.REQUEST);
        userRepository.save(user);
    }

    @Transactional
    public void verifyEmail(String token){

        Optional<VerifyEmailEntity> vf = verifyEmailRepository.findByToken(token);
        if(!vf.isPresent()) throw new EntityNotFound();

        VerifyEmailEntity verifyEmailEntity = vf.get();
        Optional<User> u = userRepository.findByEmail(verifyEmailEntity.getEmail());
        User user = u.get();
        user.setEmailVerified(true);
        userRepository.save(user);
        verifyEmailRepository.delete(verifyEmailEntity);

    }

    @Transactional
    public void updateProfile(HttpServletRequest req, String name, String surname, LocalDate dateOfBirth, String gender, String phoneNumber, String address){
        User user = userRepository.findByEmail(tokenProvider.getUsername(tokenProvider.resolveToken(req)))
                .orElseThrow(() -> new EntityNotFound());
        user.update(name,surname,dateOfBirth,gender,phoneNumber,address);
        userRepository.save(user);
    }

    public void addProfileImage( MultipartFile file, HttpServletRequest req) throws IOException {

        User user = userRepository.findByEmail(tokenProvider.getUsername(tokenProvider.resolveToken(req)))
                .orElseThrow(() -> new EntityNotFound());
        user.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        userRepository.save(user);

    }

    @Transactional
    public void generateMembershipPdf( HttpServletResponse response, HttpServletRequest req) throws IOException, DocumentException {

        User user = getCurrentUser(req);
       MembershipForm membershipForm = membershipFormService.getMembershipFormByOwner(user.getEmail());

        PDFGenerator pdfGenerator = new PDFGenerator();
        pdfGenerator.generateMembershipPDF(user, membershipForm, response);
    }

    @Transactional
    public void creataUpdateMembershipForm(HttpServletRequest req ,String informationPromoter1, String informationPromoter2, String placeOfWork, String addressPlaceOfWork,
                                            String position,  String university, String faculty, String fieldOfStudy,
                                            String yearGraduation, String universityTitle, String diplomaNumberPsychologist, String speciality,
                                            String gradeOfSpeciality, String yearSpeciality, String specialInterestsPsychology){
        User user = getCurrentUser(req);
        membershipFormService.createUpdateMembershipForm(user,informationPromoter1,informationPromoter2,placeOfWork,addressPlaceOfWork,position,university,faculty,
                fieldOfStudy,yearGraduation,universityTitle,diplomaNumberPsychologist,speciality,gradeOfSpeciality,yearSpeciality,specialInterestsPsychology );
    }

}
