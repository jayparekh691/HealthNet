package com.example.project3.services;

import com.example.project3.entities.Appointment;
import com.example.project3.repo.AppointmentRepo;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class pdfService {
    @Autowired
    private AppointmentRepo appointmentRepo;

    public ByteArrayInputStream createPdf(Integer a_id){
        String title="Prescription";
        Appointment appointment =this.appointmentRepo.findById(a_id).orElseThrow();
        String content="Instruction/Dosage : "+appointment.getDiagnostics().getPrescription();
        String patientName="Patient Name : "+appointment.getPatient().getName();
        String hospitalName="XYZ Hospital";
        String docName="Doctor Name : "+appointment.getDoctor().getName();
        String remarks="Remarks : "+appointment.getDiagnostics().getRemarks();
        String diagnosis="Diagnosis : "+appointment.getDiagnostics().getDiagnosis();
        Date date=appointment.getCurr_date();
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        String strDate ="Date : "+ formatter.format(date);
        String patientAge="Patient Age : "+appointment.getPatient().getAge()+" yrs";

        ByteArrayOutputStream out=new ByteArrayOutputStream();
        Document document=new Document();


        PdfWriter.getInstance(document,out);
        document.open();
        Font titleFont= FontFactory.getFont(FontFactory.HELVETICA_BOLD,25);
        Paragraph hospitalPara=new Paragraph(hospitalName , titleFont);
        hospitalPara.setAlignment(Element.ALIGN_CENTER);
        document.add(hospitalPara);
        Paragraph titlePara=new Paragraph(title , titleFont);
        titlePara.setAlignment(Element.ALIGN_CENTER);
        document.add(titlePara);
        Paragraph blank=new Paragraph(" ");
        document.add(blank);
        Font paraFont=FontFactory.getFont(FontFactory.HELVETICA,18);
        Paragraph dd=new Paragraph(strDate,paraFont);
        dd.setAlignment(Element.ALIGN_RIGHT);
        document.add(dd);



        Paragraph doctorPara=new Paragraph(docName,paraFont);
        document.add(doctorPara);
        Paragraph patientPara=new Paragraph(patientName,paraFont);
        document.add(patientPara);
        Paragraph patientAgePara=new Paragraph(patientAge,paraFont);
        document.add(patientAgePara);
        Paragraph diagPara=new Paragraph(diagnosis,paraFont);
        document.add(diagPara);
        Paragraph paragraph=new Paragraph(content,paraFont);
        document.add(paragraph);
        Paragraph remPara=new Paragraph(remarks,paraFont);
        document.add(remPara);
        document.close();
        return new ByteArrayInputStream(out.toByteArray());

    }
}
