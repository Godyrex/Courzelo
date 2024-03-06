package com.courzelo.lms.services.IService;


import com.courzelo.lms.entities.Grades;

import java.util.List;

public interface IGradeService {
    void saveGrades(Grades grades);
    void deleteGrades(String grades);
    void updateGrades (Grades grades);
    Grades getGradesByID(String gradesID);
    List<Grades> getGradess();
    List<Grades> findAllByIdExamen(String examId);
}
