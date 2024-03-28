package com.courzelo.lms.services.schedule;


import com.courzelo.lms.dto.schedule.FieldOfStudyDTO;
import com.courzelo.lms.dto.schedule.SemesterDTO;
import com.courzelo.lms.entities.schedule.Department;
import com.courzelo.lms.entities.schedule.FieldOfStudy;
import com.courzelo.lms.entities.schedule.Semester;
import com.courzelo.lms.repositories.DepartmentRepository;
import com.courzelo.lms.repositories.FieldOfStudyRepository;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class FieldOfStudyService {

    private final FieldOfStudyRepository fieldOfStudyRepository;
    private final DepartmentRepository departmentRepository;

    public FieldOfStudyService(final FieldOfStudyRepository fieldOfStudyRepository, DepartmentRepository departmentRepository) {
        this.fieldOfStudyRepository = fieldOfStudyRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<FieldOfStudyDTO> findAll() {
        final List<FieldOfStudy> fieldOfStudies = fieldOfStudyRepository.findAll(Sort.by("id"));
        return fieldOfStudies.stream()
                .map(fieldOfStudy -> mapToDTO(fieldOfStudy, new FieldOfStudyDTO()))
                .toList();
    }

    public FieldOfStudyDTO get(final String id) {
        return fieldOfStudyRepository.findById(id)
                .map(fieldOfStudy -> mapToDTO(fieldOfStudy, new FieldOfStudyDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final FieldOfStudyDTO fieldOfStudyDTO) {


        final FieldOfStudy fieldOfStudy = new FieldOfStudy();

        mapToEntity(fieldOfStudyDTO, fieldOfStudy);

        return fieldOfStudyRepository.save(fieldOfStudy).getId();
    }

    public void update(final String id, final FieldOfStudyDTO fieldOfStudyDTO) {
        final FieldOfStudy fieldOfStudy = fieldOfStudyRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(fieldOfStudyDTO, fieldOfStudy);
        fieldOfStudyRepository.save(fieldOfStudy);
    }

    public void delete(final String id) {
        fieldOfStudyRepository.deleteById(id);
    }

    private FieldOfStudyDTO mapToDTO(final FieldOfStudy fieldOfStudy,
                                     final FieldOfStudyDTO fieldOfStudyDTO) {
        fieldOfStudyDTO.setId(fieldOfStudy.getId());
        fieldOfStudyDTO.setName(fieldOfStudy.getName());
        fieldOfStudyDTO.setNumbrWeeks(fieldOfStudy.getNumbrWeeks());
        fieldOfStudyDTO.setChefField(fieldOfStudy.getChefField());
        fieldOfStudyDTO.setDepartmentID(fieldOfStudy.getDepartment().getId());
        return fieldOfStudyDTO;
    }

    private FieldOfStudy mapToEntity(final FieldOfStudyDTO fieldOfStudyDTO,
                                     final FieldOfStudy fieldOfStudy) {
        fieldOfStudy.setId(fieldOfStudyDTO.getId());
        fieldOfStudy.setName(fieldOfStudyDTO.getName());
        fieldOfStudy.setNumbrWeeks(fieldOfStudyDTO.getNumbrWeeks());
        fieldOfStudy.setChefField(fieldOfStudyDTO.getChefField());
        Department department = departmentRepository.findById(fieldOfStudyDTO.getDepartmentID())
                .orElseThrow(() -> new RuntimeException("department not found"));
        fieldOfStudy.setDepartment(department);
        return fieldOfStudy;
    }

    public List<FieldOfStudyDTO> getFields(String departmentID) {
        Department department = departmentRepository.findById(departmentID)
                .orElseThrow(() -> new NotFoundException("Department not found"));
        return department.getFieldOfStudies().stream()
                .map(fieldOfStudy -> mapToDTO(fieldOfStudy, new FieldOfStudyDTO()))
                .collect(Collectors.toList());
    }
    public FieldOfStudy addField(FieldOfStudy fieldOfStudy) {
        return fieldOfStudyRepository.save(fieldOfStudy);
    }

    public List<Semester> getSemestersByFieldOfStudy(String id) {
        FieldOfStudy fieldOfStudy = fieldOfStudyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Field of Study not found"));
        List<Semester> semesters = new ArrayList<>();
        fieldOfStudy.getClasses().forEach(classe -> {
            semesters.add(classe.getSemester());
        });

        return semesters;
    }
}
