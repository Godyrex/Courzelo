package com.courzelo.lms.services;

import com.courzelo.lms.entities.CourseContent;
import com.courzelo.lms.repositories.CoursContentRepository;
import com.courzelo.lms.services.IService.ICoursContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoursContentService implements ICoursContentService {

    @Autowired
    CoursContentRepository coursContentRepository ;

    @Override
    public CourseContent saveCoursContent(CourseContent courseContent) {
        return coursContentRepository.save(courseContent);
    }

    @Override
    public void deleteCoursContent(String courseContent) {
        coursContentRepository.deleteById(courseContent);
    }

    @Override
    public CourseContent updateCoursContent(CourseContent courseContent) {
        return coursContentRepository.save(courseContent);
    }

    @Override
    public List<CourseContent> getCoursContentByID(String courseContentID) {
        return coursContentRepository.findAllByCoursId(courseContentID);
    }

    @Override
    public List<CourseContent> getCoursContents() {
        return coursContentRepository.findAll();
    }
}