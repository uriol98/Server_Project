package org.server.PDF;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import org.server.entity.User;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;

public class PDFGenerator {


    public void generatePDF(User user, HttpServletResponse response) throws FileNotFoundException, IOException,DocumentException {

        PdfReader reader = new PdfReader("\\pdf\\pdf_prova_form.pdf");
        PdfStamper stamper = new PdfStamper(reader, response.getOutputStream());
        AcroFields form = stamper.getAcroFields();
        // ADD fields
        form.setField("name",user.getName());
        form.setField("surname", user.getSurname());
        stamper.setFormFlattening(true);
        stamper.close();
        reader.close();
    }


}
