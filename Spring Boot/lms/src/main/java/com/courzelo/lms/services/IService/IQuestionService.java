package com.courzelo.lms.services.IService;


import com.courzelo.lms.entities.Question;

import java.util.List;

public interface IQuestionService {
    void saveQuestion(Question question);
    void deleteQuestion(String question);
    void updateQuestion (Question question);
    Question getQuestionByID(String questionID);
    List<Question> getQuestions();
}
