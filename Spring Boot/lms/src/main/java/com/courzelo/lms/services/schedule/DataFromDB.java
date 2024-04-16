package com.courzelo.lms.services.schedule;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.dto.schedule.*;
import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.services.program.ClassService;
import com.courzelo.lms.services.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor

public class DataFromDB {

    public static List<User> teachers;

    public List<SemesterDTO> semesters;
    public static List<ElementModuleDTO> elementModules;
    public static List<FieldOfStudyDTO> fieldOfStudies;
    public static List<DepartmentDTO> departments;
    public static List<ClassDTO> classes;
    public static List<ModulDTO> moduls;
    private UserService userService;
    private SemesterService semesterService;
    private ElementModuleService elementModuleService;
    private FieldOfStudyService fieldOfStudyService;
    private DepartmentService departmentService;
    private ModulService modulService;
    private ClassService classService;

    public void loadDataFromDatabase() {
        semesters = semesterService.findAll();
        //userDTOS=userService.getUserByID();
        elementModules = elementModuleService.findAll();
        fieldOfStudies = fieldOfStudyService.findAll();
        departments = departmentService.findAll();
        moduls = modulService.findAll();
        teachers=userService.getProfsByRole();
        classes = classService.getClasses2();

    }
}
