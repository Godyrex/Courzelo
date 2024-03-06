package com.courzelo.lms.services;


import com.courzelo.lms.entities.Teacher;

import java.util.List;

public interface ITeacherService {
    void saveTeacher(Teacher teacher);
    void deleteTeacher(Teacher teacher);
    void updateTeacher (Teacher teacher);
    Teacher getTeacherByID(String teacherID);
    List<Teacher> getTeachers();
}
