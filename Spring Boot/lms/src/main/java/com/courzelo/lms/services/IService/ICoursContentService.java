package com.courzelo.lms.services.IService;

import com.courzelo.lms.entities.CourseContent;

import java.util.List;

public interface ICoursContentService {


    CourseContent saveCoursContent(CourseContent courseContent);
    void deleteCoursContent(String courseContent);
    CourseContent updateCoursContent (CourseContent courseContent);
    List<CourseContent> getCoursContentByID(String courseContentID);
    List<CourseContent> getCoursContents();
}