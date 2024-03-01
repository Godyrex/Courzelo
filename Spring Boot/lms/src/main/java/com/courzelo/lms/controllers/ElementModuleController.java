package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.ElementModuleDTO;
import com.courzelo.lms.services.ElementModuleService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/elementModules", produces = MediaType.APPLICATION_JSON_VALUE)
public class ElementModuleController {
    private final ElementModuleService elementModuleService;

    public ElementModuleController(final ElementModuleService elementModuleService) {
        this.elementModuleService = elementModuleService;
    }

    @GetMapping
    public ResponseEntity<List<ElementModuleDTO>> getAllElementModules() {
        return ResponseEntity.ok(elementModuleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ElementModuleDTO> getElementModule(
            @PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(elementModuleService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createElementModule(
            @RequestBody @Valid final ElementModuleDTO elementModuleDTO) {
        final String createdId = elementModuleService.create(elementModuleDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateElementModule(@PathVariable(name = "id") final String id,
                                                    @RequestBody @Valid final ElementModuleDTO elementModuleDTO) {
        elementModuleService.update(id, elementModuleDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteElementModule(@PathVariable(name = "id") final String id) {
        elementModuleService.delete(id);
        return ResponseEntity.noContent().build();
    }

   // @RequestMapping("/api/days")
   /* @GetMapping
    public ResponseEntity<DayOfWeek[]> getDaysOfWeek() {
        return ResponseEntity.ok(DayOfWeek.values());
    }*/
}
