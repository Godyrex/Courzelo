package com.courzelo.lms.services;


import com.courzelo.lms.entities.Student;
import com.courzelo.lms.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudentService implements IStudentService {
    private final StudentRepository studentRepository;

    @Override
    public void saveStudent(Student student) {
        studentRepository.save(student);
    }

    @Override
    public void deleteStudent(Student student) {
        studentRepository.delete(student);
    }

    @Override
    public void updateStudent(Student student) {
        studentRepository.save(student);
    }

    @Override
    public Student getStudentByID(String studentID) {

        return studentRepository.findById(studentID)
                .orElseThrow(() -> new RuntimeException("Student Not Found!") );
    }

    @Override
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }
}
