package com.courzelo.lms.services;

import com.courzelo.lms.dto.DepartmentDTO;
import com.courzelo.lms.dto.ElementModuleDTO;
import com.courzelo.lms.dto.TimeTableDTO;
import com.courzelo.lms.entities.Department;
import com.courzelo.lms.entities.ElementModule;
import com.courzelo.lms.entities.Period;
import com.courzelo.lms.entities.TimeTable;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.repositories.TimeTableRepository;
import com.courzelo.lms.utils.NotFoundException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;

import javax.swing.text.Document;
import java.awt.print.Pageable;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TimeTableService {
  
    private ElementModuleRepository elementModuleRepository;
    private TimeTableRepository timeTableRepository ;
    private  ElementModuleService elementModuleService;

    private Map<DayOfWeek, Map<Period, String>> schedule;




   /* public  List<Map<String, List<ElementModule>>> getAllEmplois(List<ElementModule> elementModules) {
        List<Map<String, List<ElementModule>>> emplois = new ArrayList<>();
        for (ElementModule elementModule : elementModules)  {
            Map<String, List<ElementModule>> emploi = new HashMap<>();
            emploi.put(elementModule.getId(), elementModuleService.getEmploisByClass(elementModule.getId()));
            emplois.add(emploi);
        }
        return emplois;
    }


    public  void addModule(DayOfWeek dayOfWeek, Period period, String module) {
        if (!schedule.containsKey(dayOfWeek)) {
            schedule.put(dayOfWeek, new HashMap<>());
        }
        schedule.get(dayOfWeek).put(period, module);
    }

    public String getModule(DayOfWeek dayOfWeek, Period period) {
        if (schedule.containsKey(dayOfWeek)) {
            return schedule.get(dayOfWeek).get(period);
        }
        return null;
    }

    public TimeTableService generateTimetable(List<ElementModule> elementModules) {
        TimeTableService timetable = new TimeTableService();
        for (ElementModule elementModule : elementModules) {
            DayOfWeek dayOfWeek = elementModule.getJour();
            Period period = elementModule.getPeriod();
            String module = elementModule.getModule();
            addModule(dayOfWeek, period, module);
        }
        return timetable;
    }*/
    ////////////////
    /*
   @Autowired
   public TimeTableService(ElementModuleRepository elementModuleRepository) {
       this.elementModuleRepository = elementModuleRepository;
   }

    public Page<TimeTable> findAll(Pageable pageable) {
        return new PageImpl<>(new ArrayList<>(), (org.springframework.data.domain.Pageable) pageable, 0);
    }

    public TimeTable get(String id) {
        return null;
    }

    public String create(TimeTable timeTable) {

        return "created id";
    }

    public void update(String id, TimeTable timeTable) {
        final TimeTable timeTable = timeTableRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(TimeTableDTO, TimeTable);
        elementModuleRepository.save(timeTable);
    }

    public void delete(String id) {
        TimeTableRepository.deleteById(id);

    }

    public long countTimetables() {
        return elementModuleRepository.count();
    }

    public List<Map<String, List<ElementModule>>> generateTimetable() {
        List<ElementModule> elementModules = elementModuleRepository.findAll();

        return new ArrayList<>();
    }

    public List<Map<String, List<ElementModule>>> getAllEmplois(List<ElementModule> elementModules) {
        // implementation to get all emplois
        return new ArrayList<>();
    }
    private TimeTableDTO mapToDTO(final TimeTable timeTable,
                                      final TimeTableDTO timeTableDTO) {
        timeTableDTO.setId( timeTable.getId());
        timeTableDTO.setDepartment(timeTable.getDepartment());
        timeTableDTO.setSemester(timeTable.getSemester());
        timeTableDTO.setPeriods(timeTable.getPeriods());
        return timeTableDTO;
    }

    private TimeTable mapToEntity(final TimeTableDTO timeTableDTO,
                                      final  TimeTable  timeTable) {
        timeTable.setDepartment(timeTableDTO.getDepartment());
        timeTable.setSemester(timeTableDTO.getSemester());
        timeTable.setPeriods(timeTableDTO.getPeriods());
        return timeTable;
    }
}
  /* public static void main(String[] args) {
       // Connect to MongoDB
       MongoClient mongoClient = MongoClients.create("mongodb+srv://nour:nour@courzelo.lxmmfz5.mongodb.net/test?retryWrites=true&w=majority");
       MongoDatabase database = mongoClient.getDatabase("test");
       MongoCollection<Document> timetableCollection = database.getCollection("timetable");
       List<Document> timetable = generateTimetable(timetableCollection, "Computer Science", 1);
       printTimetable(timetable);

       mongoClient.close();
   }

    public static List<Document> generateTimetable(MongoCollection<Document> timetableCollection, String department, int semester) {
        List<Document> query = new ArrayList<>();
        query.add(new Document("department", department));
        query.add(new Document("semester", semester));

        return timetableCollection.find(new Document("$and", query)).into(new ArrayList<>());
    }

    public static void printTimetable(List<Document> timetable) {
        System.out.println("Department: " + timetable.get(0).get("department"));
        System.out.println("Semester: " + timetable.get(0).get("semester"));
        System.out.println("Timetable:");

        for (Document period : timetable.get(0).getList("periods", Document.class)) {
            System.out.println(period.get("day") + ": " + period.get("time") + ", " + period.get("course"));
        }
    }*/
   public String create(final TimeTableDTO timeTableDTO ) {
       final TimeTable timeTable = new TimeTable();
       mapToEntity(timeTableDTO, timeTable);
       return timeTableRepository.save(timeTable).getId();
   }
    private TimeTable mapToEntity(final TimeTableDTO timeTableDTO,
                                   final TimeTable timeTable) {
        timeTable.setSemesters(timeTableDTO.getSemesters());
        timeTable.setDepartments(timeTableDTO.getDepartments());
        timeTable.setElementModules(timeTableDTO.getElementModules());
        return timeTable;
    }

}

