package com.courzelo.lms.services;

import com.courzelo.lms.dto.TimeTableDTO;
import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.entities.Period;
import com.courzelo.lms.entities.TimeTable;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.repositories.TimeTableRepository;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TimeTableService {
  
    private final ElementModuleRepository elementModuleRepository;
    private final TimeTableRepository timeTableRepository ;
    private  ElementModuleService elementModuleService;

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
    public static TimeTable generateTimetable1(List<ElementModule> elementModules) {
        TimeTable timetable = new TimeTable();
        Map<DayOfWeek, Map<Period, List<ElementModule>>> scheduleMap = new HashMap<>();
        for (DayOfWeek dayOfWeek : DayOfWeek.values()) {
            scheduleMap.put(dayOfWeek, new HashMap<>());
            for (Period period : Period.values()) {
                scheduleMap.get(dayOfWeek).put(period, new ArrayList<>());
            }
        }
        for (ElementModule elementModule : elementModules) {
            addModuleToSchedule(elementModule, scheduleMap);
        }
        timetable.setSchedule(scheduleMap);
        return timetable;
    }

    private static void addModuleToSchedule(ElementModule elementModule, Map<DayOfWeek, Map<Period, List<ElementModule>>> scheduleMap) {
        for (DayOfWeek dayOfWeek : elementModule.getDayOfWeeks()) {
            for (Period period : elementModule.getPeriods()) {
                scheduleMap.get(dayOfWeek).get(period).add(elementModule);
            }
        }
    }
    private static void setSchedule(ElementModule elementModule, List<ElementModule> existingModules) {
        List<Period> schedule = elementModule.getPeriods();
        for (ElementModule existingModule : existingModules) {
            if (hasConflict(elementModule, existingModule)) {
                List<Period> newSchedule = generateNewSchedule(schedule);
                elementModule.setPeriods(newSchedule);
                break;
            }
        }
    }
    private static boolean hasConflict(ElementModule module1, ElementModule module2) {
        List<Period> schedule1 = module1.getPeriods();
        List<Period> schedule2 = module2.getPeriods();
        for (Period period1 : schedule1) {

            if (schedule2.contains(period1)) {
                return true;
            }
        }
        return false;
    }
    private static List<Period> generateNewSchedule(List<Period> schedule) {
        return new ArrayList<>();
    }



}

