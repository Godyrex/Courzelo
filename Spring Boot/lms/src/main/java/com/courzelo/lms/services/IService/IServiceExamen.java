package com.courzelo.lms.services.IService;


import com.courzelo.lms.entities.Exam;

import java.util.List;

public interface IServiceExamen {
    void saveExam(Exam exam);
    void deleteExam(String exam);
    void updateExam (Exam exam);
    Exam getExamByID(String examID);
    List<Exam> getExams();
}
