package com.courzelo.lms.services;

import com.courzelo.lms.entities.Class;
import com.courzelo.lms.repositories.ClassRepository;
import com.courzelo.lms.services.IService.IClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService implements IClassService {
    @Autowired
    ClassRepository classRepository ;
    @Override
    public Class saveClass(Class classe) {
        return classRepository.save(classe);
    }

    @Override
    public void deleteClass(String classe) {
        classRepository.deleteById(classe);

    }

    @Override
    public Class updateClass(Class classe) {

        return classRepository.save(classe);
    }

    @Override
    public Class getClassByID(String classID) {
        return classRepository.findById(classID).get();
    }

    @Override
    public List<Class> getClasss() {
        return classRepository.findAll();
    }
}
