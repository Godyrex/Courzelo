package com.courzelo.lms.services;


import com.courzelo.lms.entities.Student;

import java.util.List;

public interface IStudentService {
    void saveStudent(Student student);
    void deleteStudent(Student student);
    void updateStudent (Student student);
    Student getStudentByID(String studentID);
    List<Student> getStudents();
}
