package com.courzelo.lms.services.schedule;

import com.courzelo.lms.dto.schedule.ElementModuleDTO;
import com.courzelo.lms.entities.schedule.Department;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Semester;
import com.courzelo.lms.repositories.DepartmentRepository;
import com.courzelo.lms.repositories.ElementModuleRepository;
import com.courzelo.lms.repositories.SemesterRepository;
import com.courzelo.lms.utils.NotFoundException;
import jakarta.persistence.PostPersist;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ElementModuleService {

    private final ElementModuleRepository elementModuleRepository;
    private final SemesterRepository semesterRepository;
    private final DepartmentRepository departmentRepository;


    public ElementModuleService(final ElementModuleRepository elementModuleRepository, SemesterRepository semesterRepository, DepartmentRepository departmentRepository) {
        this.elementModuleRepository = elementModuleRepository;
        this.semesterRepository = semesterRepository;
        this.departmentRepository = departmentRepository;
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
        mapToEntity(elementModuleDTO, elementModule);
        return elementModuleRepository.save(elementModule).getId();
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
        elementModuleDTO.setClasses(elementModule.getClasses());
        elementModuleDTO.setSemesters(elementModule.getSemesters());
        elementModuleDTO.setDepartments(elementModule.getDepartments());
        return elementModuleDTO;
    }

    private ElementModule mapToEntity(final ElementModuleDTO elementModuleDTO,
                                      final ElementModule elementModule) {
        elementModule.setNmbrHours(elementModuleDTO.getNmbrHours());
        elementModule.setName(elementModuleDTO.getName());
        elementModule.setDayOfWeek(elementModuleDTO.getDayOfWeek());
        elementModule.setPeriod(elementModuleDTO.getPeriod());
        elementModule.setClasses(elementModuleDTO.getClasses());
        elementModule.setSemesters(elementModuleDTO.getSemesters());
        elementModule.setDepartments(elementModuleDTO.getDepartments());
        elementModule.setNumSemesters(elementModuleDTO.getNumSemesters());
        elementModule.setNumDepartments(elementModuleDTO.getNumDepartments());
        elementModule.setModul(elementModuleDTO.getModul());
        return elementModule;
    }

    public ElementModule getElementDeModuleById(String id) {
        return elementModuleRepository.findById(id).orElseThrow(() -> new RuntimeException("Module Element number " + id + " does not exist!"));
    }

    public List<ElementModule> getEmploisByClasse(String id) {
        return elementModuleRepository.getEmploisByClasses(id);
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




