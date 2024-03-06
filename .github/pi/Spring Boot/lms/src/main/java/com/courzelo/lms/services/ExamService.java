package com.courzelo.lms.services;


import com.courzelo.lms.entities.Exam;
import com.courzelo.lms.repositories.ExamRepository;
import com.courzelo.lms.services.IService.IServiceExamen;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService implements IServiceExamen {
    private  final ExamRepository examRepository;
    @Override
    public void saveExam(Exam exam) {
        examRepository.save(exam);
    }

    @Override
    public void deleteExam(String examID) {
        examRepository.deleteById(examID);
    }

    @Override
    public void updateExam(Exam exam) {
        examRepository.save(exam);
    }

    @Override
    public Exam getExamByID(String examID) {
        return examRepository.findById(examID).orElseThrow(()-> new RuntimeException("Exam Not Found!"));
    }

    @Override
    public List<Exam> getExams() {
        return examRepository.findAll();
    }
}
