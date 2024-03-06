package com.courzelo.lms.services;


import com.courzelo.lms.entities.Teacher;
import com.courzelo.lms.repositories.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TeacherService implements ITeacherService {
    private final TeacherRepository teacherRepository;

    @Override
    public void saveTeacher(Teacher teacher) {
    teacherRepository.save(teacher);
    }

    @Override
    public void deleteTeacher(Teacher teacher) {
    teacherRepository.delete(teacher);
    }

    @Override
    public void updateTeacher(Teacher teacher) {
    teacherRepository.save(teacher);
    }

    @Override
    public Teacher getTeacherByID(String teacherID) {
        return teacherRepository.findById(teacherID).orElseThrow(()-> new RuntimeException("Teacher Not Found!"));
    }

    @Override
    public List<Teacher> getTeachers() {
        return teacherRepository.findAll();
    }
}
