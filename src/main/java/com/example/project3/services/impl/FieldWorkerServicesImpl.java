package com.example.project3.services.impl;

import com.example.project3.entities.*;
import com.example.project3.repo.*;
import com.example.project3.services.FieldWorkerServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.project3.services.pdfService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class FieldWorkerServicesImpl implements FieldWorkerServices {
    @Autowired
    private PatientRepo patientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private VisitRepo visitRepo;
    @Autowired
    private MedicalRepo medicalRepo;
    @Autowired
    private pdfService pdfservice;
    @Override
    public List<VisitModel> getAppointmentListFW(Integer fid) {
        Employee employee = this.employeeRepo.findById(fid).orElseThrow();
        List<Patient> patients = this.patientRepo.findPatientByFieldworker(employee);
        List<Appointment> finalAppointments=new ArrayList<Appointment>();
        for(Patient p:patients)
        {
            List<Appointment> appointments = this.appointmentRepo.findByPatient(p);
            List<Appointment> appointments1 = new ArrayList<>();
            for (Appointment appointment : appointments) {
//                appointment.setDiagnostics(null);
                appointment.setDoctor(null);
                if (appointment.getFollowupRemaining() == true) {
                    appointments1.add(appointment);
                }
            }
            for(Appointment appointment:appointments1)
                finalAppointments.add(appointment);
        }
        List<VisitModel> visitModelList=new ArrayList<>();
        for(Appointment appointment : finalAppointments){
            for(Visit visit : appointment.getFollowup().getVisitList()){
                if(visit.isVisited()==true)
                    continue;
                VisitModel visitModel = new VisitModel();
                visitModel.setV_id(visit.getV_id());
                visitModel.setP_id(appointment.getPatient().getPid());
                visitModel.setSugarLevel(appointment.getFollowup().getInstructions().isSugarLevel());
                visitModel.setTemperature(appointment.getFollowup().getInstructions().isTemperature());
                visitModel.setSpo2Level(appointment.getFollowup().getInstructions().isSpo2Level());
                visitModel.setBloodPressure(appointment.getFollowup().getInstructions().isBloodPressure());
                visitModel.setName(appointment.getPatient().getName());
                visitModel.setAge(appointment.getPatient().getAge());
                visitModel.setAddress(appointment.getPatient().getAddress());
                visitModel.setCity(appointment.getPatient().getCity());
                visitModel.setGender(appointment.getPatient().getGender());
                visitModel.setState(appointment.getPatient().getState());
                visitModel.setPincode(appointment.getPatient().getPincode());
                visitModel.setMobilenumber(appointment.getPatient().getMobilenumber());
                visitModel.setTown(appointment.getPatient().getTown());
                visitModel.setIsvisited(visit.isVisited());
                visitModel.setDate(visit.getDate());
                visitModel.setOtp(visit.getOtp());
                visitModel.setPrescription(pdfservice.createPdf(appointment.getA_id()));
                visitModel.setF_id(appointment.getFollowup().getF_id());
                visitModelList.add(visitModel);
            }
        }
        return visitModelList;
    }

    @Override
    public Appointment getVisitDetails(Integer id) {
        Appointment appointment=this.appointmentRepo.findById(id).orElseThrow();
        return appointment;
    }
    public  Integer saveVisit(ReceiveVisitDataModel receiveVistDataModel) throws IOException {

        Visit visit = this.visitRepo.findById(receiveVistDataModel.getV_id()).orElseThrow();
        if(visit.isVisited()==true)
            return visit.getV_id();
        visit.setV_id(receiveVistDataModel.getV_id());
        MedicalData medicalData = new MedicalData();
        medicalData.setBloodPressure(receiveVistDataModel.getBloodPressure());
        medicalData.setSugarLevel(receiveVistDataModel.getSugarLevel());
        medicalData.setTemperature(receiveVistDataModel.getTemperature());
        medicalData.setPhoto(receiveVistDataModel.getPhoto());
        visit.setVisited(true);
        Employee employee = this.employeeRepo.findById(receiveVistDataModel.getF_id()).orElseThrow();
        visit.setFieldWorker(employee);
        medicalData.setSpo2Level(receiveVistDataModel.getSpo2Level());
        this.medicalRepo.save(medicalData);
        visit.setMedicalData(medicalData);
        visit.setDate(receiveVistDataModel.getDate());
        this.visitRepo.save(visit);
        return visit.getV_id();
    }

    @Override
    public List<Integer> currentPatientList(Integer id) {
        List<Patient> patientList = new ArrayList<>();
        Employee employee = this.employeeRepo.findById(id).orElseThrow();
        patientList = this.patientRepo.findPatientByFieldworker(employee);
        List<Integer> patientIDs = new ArrayList<>();
        for(Patient patient : patientList) {
            patientIDs.add(patient.getPid());
        }
        return patientIDs;
    }
}
