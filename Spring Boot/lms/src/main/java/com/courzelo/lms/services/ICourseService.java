package com.courzelo.lms.services;

import com.courzelo.lms.entities.Course;

import java.util.List;

public interface ICourseService {


    Course saveCourse(Course course);
    void deleteCourse(String classe);
    Course updateCourse (Course classe);
    Course getCourseByID(String classeID);
    List<Course> getCourses();
}
