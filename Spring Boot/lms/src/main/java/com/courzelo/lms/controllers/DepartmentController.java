package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.DepartmentDTO;

import com.courzelo.lms.dto.FieldOfStudyDTO;
import com.courzelo.lms.repositories.DepartmentRepository;
import com.courzelo.lms.services.DepartmentService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/api/departments", produces = MediaType.APPLICATION_JSON_VALUE)
public class DepartmentController {
    private final DepartmentService departmentService;
    private final DepartmentRepository departmentRepository;

    public DepartmentController(final DepartmentService departementService, DepartmentRepository departmentRepository) {
        this.departmentService = departementService;
        this.departmentRepository = departmentRepository;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> getDepartment(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(departmentService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<DepartmentDTO> createDepartment(
            @RequestBody @Valid final DepartmentDTO departmentDTO ) {
        departmentService.create(departmentDTO);


        return new ResponseEntity<>(departmentDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDepartment(@PathVariable(name = "id") final String id,
                                                   @RequestBody @Valid final DepartmentDTO departmentDTO) {
        departmentService.update(id, departmentDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteDepartment(@PathVariable(name = "id") final String id) {
        departmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/count")
    public ResponseEntity<Long> countDepartments() {
        long departmentCount = departmentService.countDepartements();
        return ResponseEntity.ok(departmentCount);
    }

}
