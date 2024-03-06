package com.courzelo.lms.services;

import com.courzelo.lms.entities.Course;
import com.courzelo.lms.repositories.CoursRepository;
import com.courzelo.lms.services.IService.ICourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursService implements ICourseService {

    @Autowired
    CoursRepository coursRepository ;
    @Override
    public Course saveCourse(Course course) {
        return coursRepository.save(course);
    }

    @Override
    public void deleteCourse(String classe) {
       coursRepository.deleteById(classe);
    }

    @Override
    public Course updateCourse(Course classe) {
        return coursRepository.save(classe);
    }

    @Override
    public Course getCourseByID(String classeID) {
        return coursRepository.findById(classeID).get();
    }

    @Override
    public List<Course> getCourses() {
        return coursRepository.findAll();
    }
}
