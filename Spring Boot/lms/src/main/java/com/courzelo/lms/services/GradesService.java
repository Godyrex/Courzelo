package com.courzelo.lms.services;


import com.courzelo.lms.entities.Grades;
import com.courzelo.lms.repositories.GradeRepository;
import com.courzelo.lms.services.IService.IGradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GradesService implements IGradeService {
    private  final GradeRepository gradesRepository;
    @Override
    public void saveGrades(Grades grades) {
        gradesRepository.save(grades);
    }

    @Override
    public void deleteGrades(String gradesID) {
        gradesRepository.deleteById(gradesID);
    }

    @Override
    public void updateGrades(Grades grades) {
        gradesRepository.save(grades);
    }

    @Override
    public Grades getGradesByID(String gradesID) {
        return gradesRepository.findById(gradesID).orElseThrow(()-> new RuntimeException("Grades Not Found!"));
    }

    @Override
    public List<Grades> getGradess() {
        return gradesRepository.findAll();
    }

    @Override
    public List<Grades> findAllByIdExamen(String examId) {
        return gradesRepository.findAllByIdExamen(examId);
    }
}
