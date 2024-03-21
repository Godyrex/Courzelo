package com.courzelo.lms.services.schedule;

import com.courzelo.lms.dto.schedule.TimeTableDTO;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Period;
import com.courzelo.lms.entities.schedule.TimeTable;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.repositories.TimeTableRepository;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TimeTableService {
  
    private final ElementModuleRepository elementModuleRepository;
    private final TimeTableRepository timeTableRepository ;
    private ElementModuleService elementModuleService;

    private Map<DayOfWeek, Map<Period, String>> schedule;

    public TimeTableService(ElementModuleRepository elementModuleRepository, final TimeTableRepository timeTableRepository, ElementModuleService elementModuleService, Map<DayOfWeek, Map<Period, String>> schedule) {
        this.elementModuleRepository = elementModuleRepository;
        this.timeTableRepository = timeTableRepository;
        this.elementModuleService = elementModuleService;

        this.schedule = schedule;
    }




    public long countTimetables() {
        return elementModuleRepository.count();
    }


    public List<Map<String, List<ElementModule>>> generateTimetable() {
        List<ElementModule> elementModules=elementModuleRepository.findAll();

        return new ArrayList<>();
    }

    public List<Map<String, List<ElementModule>>> getAllEmplois(List<ElementModule> elementModules) {
        // implementation to get all emplois
        return new ArrayList<>();
    }



   public String create(final TimeTableDTO timeTableDTO ) {
       final TimeTable timeTable = new TimeTable();
       mapToEntity(timeTableDTO, timeTable);
       return timeTableRepository.save(timeTable).getId();
   }
    private TimeTable mapToEntity(final TimeTableDTO timeTableDTO,
                                   final TimeTable timeTable) {
        timeTable.setName(timeTableDTO.getName());
        timeTable.setSemesters(timeTableDTO.getSemesters());
        timeTable.setDepartments(timeTableDTO.getDepartments());
        timeTable.setElementModules(timeTableDTO.getElementModules());
        timeTable.setClasse(timeTableDTO.getClasse());
        timeTable.setSchedule(timeTableDTO.getSchedule());
                ;
        return timeTable;
    }
    private TimeTableDTO mapToDTO(final TimeTable timeTable,
                                  final TimeTableDTO timeTableDTO) {
        timeTableDTO.setId( timeTable.getId());
        timeTableDTO.setDepartments(timeTable.getDepartments());
        timeTableDTO.setSemesters(timeTable.getSemesters());
        timeTableDTO.setClasse(timeTable.getClasse());
        timeTableDTO.setSchedule(timeTable.getSchedule());

        return timeTableDTO;
    }

    public TimeTableDTO getById(String id) {
        TimeTable timeTable = timeTableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TimeTable not found with id: " + id));
        return mapToDTO(timeTable, new TimeTableDTO());
    }


    public void update(String id, TimeTableDTO timeTableDTO) {
        TimeTable existingTimeTable = timeTableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TimeTable not found with id: " + id));
        TimeTable updatedTimeTable = mapToEntity(timeTableDTO, existingTimeTable);
        timeTableRepository.save(updatedTimeTable);
    }

    public void delete(String id) {
        TimeTable existingTimeTable = timeTableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("TimeTable not found with id: " + id));
        timeTableRepository.delete(existingTimeTable);
    }



}

