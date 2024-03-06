package com.courzelo.lms.services.IService;

import com.courzelo.lms.entities.Class;

import java.util.List;

public interface IClassService {


    Class saveClass(Class classe);
    void deleteClass(String  classe);
    Class updateClass (Class classe);
    Class getClassByID(String classID);
    List<Class> getClasss();
}
