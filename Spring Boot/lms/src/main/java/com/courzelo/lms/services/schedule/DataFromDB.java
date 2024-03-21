package com.courzelo.lms.services.schedule;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.dto.schedule.*;
import com.courzelo.lms.dto.user.UserDTO;
import com.courzelo.lms.services.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@AllArgsConstructor

public class DataFromDB {

    public List<UserDTO> userDTOS;

    public  List<SemesterDTO>semesterDTOS;
    public static List<ElementModuleDTO> elementModuleDTOS;
    public static  List<FieldOfStudyDTO> fieldOfStudyDTOS;
    public static  List<DepartmentDTO> departmentDTOS;
    public static List<ClassDTO>classDTOS;
    public static List<ModulDTO> modulDTOS;
    private UserService userService;
    private SemesterService semesterService;
    private ElementModuleService elementModuleService;
    private FieldOfStudyService fieldOfStudyService;
    private DepartmentService departmentService;
    private ModulService modulService;
    public void loadDataFromDatabase() {
        semesterDTOS=semesterService.findAll();
        //userDTOS=userService.getUserByID();
        elementModuleDTOS = elementModuleService.findAll();
        fieldOfStudyDTOS=fieldOfStudyService.findAll();
        departmentDTOS=departmentService.findAll();
        modulDTOS =modulService.findAll();

    }
}
