package com.courzelo.lms.services;


import com.courzelo.lms.dto.DepartmentDTO;
import com.courzelo.lms.entities.Department;
import com.courzelo.lms.repositories.FieldOfStudyRepository;
import com.courzelo.lms.utils.NotFoundException;
import com.courzelo.lms.repositories.DepartmentRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.courzelo.lms.entities.FieldOfStudy;

import java.util.Collections;
import java.util.List;


@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final FieldOfStudyRepository fieldOfStudyRepository;
    private final FieldOfStudyService fieldOfStudyService ;

    public DepartmentService(final DepartmentRepository departementRepository, FieldOfStudyRepository fieldOfStudyRepository, FieldOfStudyRepository fieldOfStudyRepository1, FieldOfStudyService fieldOfStudyService) {
        this.departmentRepository = departementRepository;
        this.fieldOfStudyRepository = fieldOfStudyRepository1;
        this.fieldOfStudyService = fieldOfStudyService;

    }

    public List<DepartmentDTO> findAll() {
        final List<Department> departments = departmentRepository.findAll(Sort.by("id"));
        return departments.stream()
                .map(department -> mapToDTO(department, new DepartmentDTO()))
                .toList();
    }

    public DepartmentDTO get(final String id) {
        return departmentRepository.findById(id)
                .map(department -> mapToDTO(department, new DepartmentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final DepartmentDTO departmentDTO ) {
        final Department department = new Department();
        mapToEntity(departmentDTO, department);
        return departmentRepository.save(department).getId();



    }
    /*public String create1(final DepartmentDTO departmentDTO ) {

        Department department = new Department();
        department.setName(departmentDTO.getName());
        department.setChefDepartment(departmentDTO.getChefDepartment());


        department = departmentRepository.save(department);

        // Create FieldOfStudy entity
        FieldOfStudy fieldOfStudy = new FieldOfStudy();
        fieldOfStudy.setName(fieldOfStudy.getName());
        fieldOfStudy.setChefField(fieldOfStudy.getChefField());
        fieldOfStudy.setNumbrWeeks(fieldOfStudy.getNumbrWeeks());



        //fieldOfStudy.setDepartment(department);

        // Save the FieldOfStudy
        fieldOfStudy = fieldOfStudyRepository.save(fieldOfStudy);

        return department.getId();
    }
*/





    public void update(final String id, final DepartmentDTO departmentDTO) {
        final Department department = departmentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(departmentDTO, department);
        departmentRepository.save(department);
    }

    public void delete(final String id) {
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO mapToDTO(final Department departement,
                                   final DepartmentDTO departmentDTO) {

        departmentDTO.setName(departement.getName());
        departmentDTO.setChefDepartment(departement.getChefDepartment());

        return departmentDTO;
    }

    private Department mapToEntity(final DepartmentDTO departmentDTO,
                                   final Department department) {
        department.setName(departmentDTO.getName());
        department.setChefDepartment(departmentDTO.getChefDepartment());




        return department;
    }
    public long countDepartements() {
        return departmentRepository.count();
    }

}
