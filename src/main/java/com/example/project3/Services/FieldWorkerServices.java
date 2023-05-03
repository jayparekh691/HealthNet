package com.example.project3.Services;

import com.example.project3.Models.*;

import java.io.IOException;
import java.util.List;

public interface FieldWorkerServices {
    List<VisitModel> getAppointmentListFW(Integer fid);
    Appointment getVisitDetails(Integer id);

    Integer saveVisit(ReceiveVisitDataModel md) throws IOException;

    List<Integer> currentFollowupList(Integer id);
}
