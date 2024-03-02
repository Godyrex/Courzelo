package com.courzelo.lms.services;

import com.courzelo.lms.dto.ClassDTO;
import com.courzelo.lms.dto.ProgramDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IClassService {
    ResponseEntity<List<ClassDTO>> getClasses();
    ResponseEntity<Boolean> deleteClass(String classID);
    ResponseEntity<Boolean> addClass(ClassDTO classDTO);
    ResponseEntity<Boolean> updateClass(ClassDTO classDTO);
}
