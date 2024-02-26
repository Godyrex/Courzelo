package com.courzelo.lms.services;


import com.courzelo.lms.dto.DepartmentDTO;
import com.courzelo.lms.dto.FieldOfStudyDTO;
import com.courzelo.lms.entities.Department;
import com.courzelo.lms.repositories.FieldOfStudyRepository;
import com.courzelo.lms.utils.NotFoundException;
import com.courzelo.lms.repositories.DepartmentRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.courzelo.lms.entities.FieldOfStudy;

import java.util.List;


@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final FieldOfStudyService fieldOfStudyService ;
    private final FieldOfStudyDTO fieldOfStudyDTO;
    private final FieldOfStudy fieldOfStudy;
    public DepartmentService(final DepartmentRepository departementRepository, FieldOfStudyRepository fieldOfStudyRepository, FieldOfStudyService fieldOfStudyService, FieldOfStudyDTO fieldOfStudyDTO, FieldOfStudy fieldOfStudy) {
        this.departmentRepository = departementRepository;
        this.fieldOfStudyService = fieldOfStudyService;

        this.fieldOfStudyDTO = fieldOfStudyDTO;
        this.fieldOfStudy = fieldOfStudy;
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
        departmentDTO.setFieldOfStudy(departement.getFieldOfStudy());
        return departmentDTO;
    }

    private Department mapToEntity(final DepartmentDTO departmentDTO,
                                   final Department department) {
        department.setName(departmentDTO.getName());
        department.setChefDepartment(departmentDTO.getChefDepartment());
        department.setFieldOfStudy(departmentDTO.getFieldOfStudy());


        return department;
    }
    public long countDepartements() {
        return departmentRepository.count();
    }

}
