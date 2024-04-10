package com.courzelo.lms.services.schedule;
import com.courzelo.lms.entities.schedule.FieldOfStudy;
import com.courzelo.lms.dto.schedule.ElementModuleDTO;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.repositories.*;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ElementModuleService {

    private final ElementModuleRepository elementModuleRepository;
    private final SemesterRepository semesterRepository;
    private final DepartmentRepository departmentRepository;
    private final ModulRepository modulRepository;
    private final UserRepository userRepository;
    private final FieldOfStudyRepository fieldOfStudyRepository;

    public ElementModuleService(final ElementModuleRepository elementModuleRepository, SemesterRepository semesterRepository, DepartmentRepository departmentRepository, ModulRepository modulRepository, UserRepository userRepository, FieldOfStudyRepository fieldOfStudyRepository) {
        this.elementModuleRepository = elementModuleRepository;
        this.semesterRepository = semesterRepository;
        this.departmentRepository = departmentRepository;
        this.modulRepository = modulRepository;
        this.userRepository = userRepository;
        this.fieldOfStudyRepository = fieldOfStudyRepository;
    }

    public List<ElementModuleDTO> findAll() {
        final List<ElementModule> elementModules = elementModuleRepository.findAll(Sort.by("id"));
        return elementModules.stream()
                .map(elementModule -> mapToDTO(elementModule, new ElementModuleDTO()))
                .toList();
    }

    public ElementModuleDTO get(final String id) {
        return elementModuleRepository.findById(id)
                .map(elementModule -> mapToDTO(elementModule, new ElementModuleDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final ElementModuleDTO elementModuleDTO) {
        final ElementModule elementModule = new ElementModule();
        if (elementModuleDTO.getId() != null) {
            Modul modul = modulRepository.findById(elementModuleDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Modul not found for ID: " + elementModuleDTO.getId()));
            elementModule.setModul(modul);
        }
        if (elementModuleDTO.getTeacher() != null && elementModuleDTO.getTeacher().getId() != null) {
            User teacher = userRepository.findById(elementModuleDTO.getTeacher().getId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found for ID: " + elementModuleDTO.getTeacher().getId()));
            elementModule.setTeacher(teacher);
        }
        if (elementModuleDTO.getFieldOfStudies() != null) {
            List<FieldOfStudy> fieldOfStudies = new ArrayList<>();
            for (FieldOfStudy fieldOfStudyDTO : elementModuleDTO.getFieldOfStudies()) {
                if (fieldOfStudyDTO.getId() != null) {
                    FieldOfStudy fieldOfStudy = fieldOfStudyRepository.findById(fieldOfStudyDTO.getId())
                            .orElseThrow(() -> new RuntimeException("FieldOfStudy not found for ID: " + fieldOfStudyDTO.getId()));
                    fieldOfStudies.add(fieldOfStudy);
                }
            }
            elementModule.setFieldOfStudies(fieldOfStudies);
        }


        mapToEntity(elementModuleDTO, elementModule);
        ElementModule savedElementModule = elementModuleRepository.save(elementModule);
        if (elementModule.getModul() != null) {
            modulRepository.save(elementModule.getModul());
        }
        return savedElementModule.getId();
    }

    public void update(final String id, final ElementModuleDTO elementModuleDTO) {
        final ElementModule elementModule = elementModuleRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(elementModuleDTO, elementModule);
        elementModuleRepository.save(elementModule);
    }

    public void delete(final String id) {
        elementModuleRepository.deleteById(id);
    }

    private ElementModuleDTO mapToDTO(final ElementModule elementModule,
                                      final ElementModuleDTO elementModuleDTO) {
        elementModuleDTO.setId(elementModule.getId());
        elementModuleDTO.setNmbrHours(elementModule.getNmbrHours());
        elementModuleDTO.setName(elementModule.getName());
        elementModuleDTO.setDayOfWeek(elementModule.getDayOfWeek());
        elementModuleDTO.setPeriod(elementModule.getPeriod());
        elementModuleDTO.setSemesters(elementModule.getSemesters());
        elementModuleDTO.setDepartments(elementModule.getDepartments());
        elementModuleDTO.setNumSemesters(elementModule.getNumSemesters());
        elementModuleDTO.setNumDepartments(elementModule.getNumDepartments());
        elementModuleDTO.setModul(elementModule.getModul());
        elementModuleDTO.setClasses(elementModule.getClasses());
        elementModuleDTO.setTeacher(elementModule.getTeacher());
        elementModuleDTO.setFieldOfStudies(elementModule.getFieldOfStudies());
        return elementModuleDTO;
    }

    private ElementModule mapToEntity(final ElementModuleDTO elementModuleDTO,
                                      final ElementModule elementModule) {
        elementModule.setNmbrHours(elementModuleDTO.getNmbrHours());
        elementModule.setName(elementModuleDTO.getName());
        elementModule.setDayOfWeek(elementModuleDTO.getDayOfWeek());
        elementModule.setPeriod(elementModuleDTO.getPeriod());
        elementModule.setSemesters(elementModuleDTO.getSemesters());
        elementModule.setDepartments(elementModuleDTO.getDepartments());
        elementModule.setNumSemesters(elementModuleDTO.getNumSemesters());
        elementModule.setNumDepartments(elementModuleDTO.getNumDepartments());
        elementModule.setModul(elementModuleDTO.getModul());
        elementModule.setClasses(elementModuleDTO.getClasses());
        elementModule.setTeacher(elementModuleDTO.getTeacher());
        elementModule.setFieldOfStudies(elementModuleDTO.getFieldOfStudies());
        return elementModule;
    }

    public ElementModule getElementDeModuleById(String id) {
        return elementModuleRepository.findById(id).orElseThrow(() -> new RuntimeException("Module Element number " + id + " does not exist!"));
    }

    public List<ElementModule> getEmploisByClasse(String id) {
        return elementModuleRepository.getElementModulesByClasses(id);
    }

    public ElementModule addElementModule(ElementModule elementDeModule) {
        return elementModuleRepository.save(elementDeModule);
    }

   /* public List<ElementModule>getEmploisByClass(String classe){
        return elementModuleRepository.findByClasse(classe);
    }*/
   /* @PostPersist
   public ElementModule createElementModule(@Valid ElementModuleDTO elementModuleDTO) {
        ElementModule elementModule = new ElementModule();
       List<Department> departmentList = departmentRepository.findAll();
       elementModuleDTO.setDepartments(departmentList);
       List<Semester>semesterList =semesterRepository.findAll();
       elementModuleDTO.setSemesters(semesterList);

       elementModule = mapToEntity(elementModuleDTO, elementModule);

       return elementModuleRepository.save( elementModule);
   }*/



    /*public ElementModule createElementModule(@Valid ElementModuleDTO elementModuleDTO) {
        ElementModule elementModule = new ElementModule();
        List<Department> departments = new ArrayList<>();
        for (Department departmentDTO : elementModuleDTO.getDepartments()) {
            Department department = departmentRepository.findById(departmentDTO.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Department not found for ID: " + departmentDTO.getId()));
            departments.add(department);
        }
        List<Semester> semesters = new ArrayList<>();
        for (Semester semesterDTO : elementModuleDTO.getSemesters()) {
            Semester semester = semesterRepository.findById(semesterDTO.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Semester not found for ID: " + semesterDTO.getId()));
            semesters.add(semester);
        }
        elementModule.setDepartments(departments);
        elementModule.setSemesters(semesters);
        mapToEntity(elementModuleDTO, elementModule);
        return elementModuleRepository.save(elementModule);
    }
*/

}




