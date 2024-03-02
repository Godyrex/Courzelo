package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.ClassDTO;
import com.courzelo.lms.services.IClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/class")
@RestController
@RequiredArgsConstructor
public class ClassController {
    private final IClassService iClassService;
    @PostMapping("/add")
    public ResponseEntity<Boolean> addClass(ClassDTO classDTO) {
        return iClassService.addClass(classDTO);
    }
    @GetMapping("/all")
    public ResponseEntity<List<ClassDTO>> getClasses() {
        return iClassService.getClasses();
    }

    @DeleteMapping("/delete/{classID}")
    public ResponseEntity<Boolean> deleteClass(@PathVariable String classID) {
        return iClassService.deleteClass(classID);
    }
    @PostMapping("/update")
    public ResponseEntity<Boolean> updateClass(ClassDTO classDTO) {
        return iClassService.updateClass(classDTO);
    }
}
