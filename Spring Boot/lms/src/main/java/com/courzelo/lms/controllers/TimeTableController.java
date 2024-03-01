package com.courzelo.lms.controllers;

import com.courzelo.lms.dto.DepartmentDTO;
import com.courzelo.lms.dto.TimeTableDTO;
import com.courzelo.lms.entities.Department;
import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.entities.TimeTable;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.repositories.TimeTableRepository;
import com.courzelo.lms.services.TimeTableService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@Slf4j

@AllArgsConstructor
@RequestMapping(value = "/api/TimeTable", produces = MediaType.APPLICATION_JSON_VALUE)
public class TimeTableController {
private final ElementModuleRepository elementModuleRepository;
private final TimeTableService timeTableService;
    private final TimeTableRepository timeTableRepository;
    /*@GetMapping("/generate")
    public List<Map<String, List<ElementModule>>> generateTimetable() {
        List<com.courzelo.lms.entities.ElementModule> elementModules = elementModuleRepository.findAll();
        TimeTableService timetableService = new TimeTableService();
        timetableService.generateTimetable(elementModules);
        return timetableService.getAllEmplois(elementModules);
    }*/
    //////////////////////
    /*
    @GetMapping
    public ResponseEntity<Page<TimeTableDTO>> getAllTimetables(Pageable pageable) {
        Page<TimeTable> timetables = timeTableRepository.findAll(pageable);
        List<TimeTableDTO> timetableDTOs = new ArrayList<>();
        for (TimeTable timetable : timetables) {
            TimeTableDTO timetableDTO = new TimeTableDTO();
            timetableDTO.setId(timetable.getId());
            timetableDTO(timetable.getDepartment().getName());
            timetableDTO.setSemester(timetable.getSemester());
            timetableDTO.setPeriods(timetable.getPeriods());
            timetableDTOs.add(timetableDTO);
        }
        Page<TimeTableDTO> timetableDTOPage = new PageImpl<>(timetableDTOs, pageable, timetables.getTotalElements());
        return ResponseEntity.ok(timetableDTOPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeTableDTO> getTimetableById(@PathVariable("id") final String id) {
        TimeTable timetable = TimeTableService.get(id);
        TimeTableDTO timetableDTO = new TimetableDTO();
        timetableDTO.setId(timetable.getId());
        timetableDTO.setDepartment(timetable.getDepartment().getName());
        timetableDTO.setSemester(timetable.getSemester());
        timetableDTO.setPeriods(timetable.getPeriods());
        return ResponseEntity.ok(timetableDTO);
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createTimetable(@RequestBody @Valid final TimeTableDTO timetableDTO) {
        TimeTable timetable = new TimeTable();
        timetable.setDepartment(new Department(timetableDTO.getDepartment()));
        timetable.setSemester(timetableDTO.getSemester());
        timetable.setPeriods(timetableDTO.getPeriods());
        final String createdId = timeTableService.create(timetable);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTimetable(@PathVariable(name = "id") final String id,
                                                  @RequestBody @Valid final TimeTableDTO timetableDTO) {
        Timetable timetable = new Timetable();
        timetable.setId(id);
        timetable.setDepartment(new Department(timetableDTO.getDepartment()));
        timetable.setSemester(timetableDTO.getSemester());
        timetable.setPeriods(timetableDTO.getPeriods());
        TimeTableService.update(id, timetable);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteTimetable(@PathVariable(name = "id") final String id) {
        timeTableService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countTimetables() {
        long timetableCount = timeTableService.countTimetables();
        return ResponseEntity.ok(timetableCount);
    }*/
    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createTimeTable(
            @RequestBody @Valid final TimeTableDTO timeTableDTO) {
        final String createdId = timeTableService.create(timeTableDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }


}
