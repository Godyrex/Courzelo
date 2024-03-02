package com.courzelo.lms.services;

import com.courzelo.lms.dto.ClassDTO;
import com.courzelo.lms.entities.Class;
import com.courzelo.lms.exceptions.ClassNotFoundException;
import com.courzelo.lms.repositories.ClassRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassService implements IClassService {
    private final ClassRepository classRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<List<ClassDTO>> getClasses() {
        log.info("Getting all classes");
        return ResponseEntity
                .ok()
                .body(classRepository.findAll()
                        .stream()
                        .map(classes -> modelMapper.map(classes, ClassDTO.class))
                        .toList());
    }

    @Override
    public ResponseEntity<Boolean> deleteClass(String classID) {
        log.info("Delete CLASS :" + classID);
        Class aClass = classRepository.findById(classID)
                .orElseThrow(() -> new ClassNotFoundException("Class " + classID + " not found"));
        if (aClass != null) {
            classRepository.deleteById(classID);
            return ResponseEntity.ok().body(true);
        }
        return ResponseEntity.badRequest().body(false);
    }

    @Override
    public ResponseEntity<Boolean> addClass(ClassDTO classDTO) {
        log.info("Adding class ");
        Class aClass = modelMapper.map(classDTO, Class.class);
        Class savedClass = classRepository.save(aClass);
        if (savedClass.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }

    @Override
    public ResponseEntity<Boolean> updateClass(ClassDTO classDTO) {
        log.info("Update class :" + classDTO.getId());
        classRepository.findById(classDTO.getId())
                .orElseThrow(() -> new ClassNotFoundException("Class " + classDTO.getId() + " not found"));
        Class aClass = modelMapper.map(classDTO, Class.class);
        Class savedClass = classRepository.save(aClass);
        if (savedClass.getId() != null) {
            return ResponseEntity.ok().body(true);
        } else {
            return ResponseEntity.badRequest().body(false);
        }
    }
}
