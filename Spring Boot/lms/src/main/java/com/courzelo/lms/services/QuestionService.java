package com.courzelo.lms.services;


import com.courzelo.lms.entities.Question;
import com.courzelo.lms.repositories.QuestionRepository;
import com.courzelo.lms.services.IService.IQuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {
    private  final QuestionRepository questionRepository;
    @Override
    public void saveQuestion(Question question) {
        questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(String questionID) {
        questionRepository.deleteById(questionID);
    }

    @Override
    public void updateQuestion(Question question) {
        questionRepository.save(question);
    }

    @Override
    public Question getQuestionByID(String questionID) {
        return questionRepository.findById(questionID).orElseThrow(()-> new RuntimeException("Question Not Found!"));
    }

    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public List<Question> findByIdExamen(String idExamen) {
        return questionRepository.findByIdExamen(idExamen);
    }
}
