package com.courzelo.lms.controllers;


import com.courzelo.lms.dto.FieldOfStudyDTO;
import com.courzelo.lms.entities.Department;
import com.courzelo.lms.repositories.DepartmentRepository;
import com.courzelo.lms.services.FieldOfStudyService;
import com.courzelo.lms.utils.NotFoundException;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/api/fieldOfStudies", produces = MediaType.APPLICATION_JSON_VALUE)
public class FieldOfStudyController {

    private final FieldOfStudyService fieldOfStudyService;
    private final DepartmentRepository departmentRepository;

    public FieldOfStudyController(final FieldOfStudyService fieldOfStudyService, DepartmentRepository departmentRepository) {
        this.fieldOfStudyService = fieldOfStudyService;
        this.departmentRepository = departmentRepository;
    }

    @GetMapping
    public ResponseEntity<List<FieldOfStudyDTO>> getAllFieldOfStudies() {
        return ResponseEntity.ok(fieldOfStudyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FieldOfStudyDTO> getFieldOfStudy(
            @PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(fieldOfStudyService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createFieldOfStudy(
            @RequestBody @Valid final FieldOfStudyDTO fieldOfStudyDTO) {
        final String createdId = fieldOfStudyService.create(fieldOfStudyDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFieldOfStudy(@PathVariable(name = "id") final String id,
            @RequestBody @Valid final FieldOfStudyDTO fieldOfStudyDTO) {
        fieldOfStudyService.update(id, fieldOfStudyDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteFieldOfStudy(@PathVariable(name = "id") final String id) {
        fieldOfStudyService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
