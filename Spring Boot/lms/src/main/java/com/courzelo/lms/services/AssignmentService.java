package com.courzelo.lms.services;


import com.courzelo.lms.entities.Assignment;
import com.courzelo.lms.entities.Course;
import com.courzelo.lms.repositories.AsseignmentRepository;
import com.courzelo.lms.services.IService.IAsseignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService implements IAsseignmentService {
    @Autowired
    private  final AsseignmentRepository questionRepository;


    @Override
    public void saveAssignment(Assignment assignment) {
        questionRepository.save(assignment);
    }

    @Override
    public void deleteAsseignment(String assignment) {
        questionRepository.deleteById(assignment);

    }

    @Override
    public void updateAsseignment(Assignment assignment) {
        questionRepository.save(assignment);

    }

    @Override
    public Assignment getAsseignmentByID(String assignmentID) {
        return questionRepository.findById(assignmentID).orElseThrow(()-> new RuntimeException("Assignment Not Found!"));

    }

    @Override
    public List<Assignment> getAsseignments() {
        return questionRepository.findAll();
    }

    public List<Assignment> getAsseignmentByIDCours(String idcours) {
        return questionRepository.findAssignmentByCoursId(idcours);

    }




}
