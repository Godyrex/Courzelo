package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.TimeTableDTO;
import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.services.TimeTableService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RestController
@Slf4j
@RequestMapping(value = "/api/TimeTable", produces = MediaType.APPLICATION_JSON_VALUE)
public class TimeTableController {

    private final TimeTableService timeTableService;
    private final ElementModuleRepository elementModuleRepository;

    @Autowired
    public TimeTableController(TimeTableService timeTableService, ElementModuleRepository elementModuleRepository) {
        this.timeTableService = timeTableService;
        this.elementModuleRepository = elementModuleRepository;
    }

    /*@PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createTimeTable(
            @RequestBody @Valid final TimeTableDTO timeTableDTO) {
        final String createdId = timeTableService.create(timeTableDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }*/
    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> create(@Valid @RequestBody TimeTableDTO timeTableDTO) {
        String timeTableId = timeTableService.create(timeTableDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(timeTableId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeTableDTO> getById(@PathVariable String id) {
        TimeTableDTO timeTableDTO = timeTableService.getById(id);
        return ResponseEntity.ok(timeTableDTO);
    }

    @GetMapping("/generate")
    public ResponseEntity<List<Map<String, List<ElementModule>>>> generateTimetable1() {
        List<Map<String, List<ElementModule>>> timetable = timeTableService.generateTimetable();
        return ResponseEntity.ok(timetable);
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable String id, @Valid @RequestBody TimeTableDTO timeTableDTO) {
        timeTableService.update(id, timeTableDTO);
        return ResponseEntity.ok("TimeTable updated successfully");
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> delete(@PathVariable String id) {
        timeTableService.delete(id);
        return ResponseEntity.ok("TimeTable deleted successfully");
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countTimetables() {
        long timetableCount = timeTableService.countTimetables();
        return ResponseEntity.ok(timetableCount);
    }


}
