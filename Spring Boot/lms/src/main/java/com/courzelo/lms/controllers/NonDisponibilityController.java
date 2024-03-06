package com.courzelo.lms.controllers;


import com.courzelo.lms.dto.NonDisponibilityDTO;
import com.courzelo.lms.services.NonDisponibilityService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/api/nonDisponibilities", produces = MediaType.APPLICATION_JSON_VALUE)
public class NonDisponibilityController {

    private final NonDisponibilityService nonDisponibilityService;

    public NonDisponibilityController(final NonDisponibilityService nonDisponibilityService) {
        this.nonDisponibilityService = nonDisponibilityService;
    }

    @GetMapping
    public ResponseEntity<List<NonDisponibilityDTO>> getAllNonDisponibilities() {
        return ResponseEntity.ok(nonDisponibilityService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NonDisponibilityDTO> getNonDisponibility(
            @PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(nonDisponibilityService.get(String.valueOf(id)));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createNonDisponibility(
            @RequestBody @Valid final NonDisponibilityDTO nonDisponibilityDTO) {
        final String createdId = nonDisponibilityService.create(nonDisponibilityDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateNonDisponibility(@PathVariable(name = "id") final String id,
            @RequestBody @Valid final NonDisponibilityDTO nonDisponibilityDTO) {
        nonDisponibilityService.update(id, nonDisponibilityDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteNonDisponibility(@PathVariable(name = "id") final String id) {
        nonDisponibilityService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
