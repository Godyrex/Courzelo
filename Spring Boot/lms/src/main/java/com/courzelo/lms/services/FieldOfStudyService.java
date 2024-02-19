package com.courzelo.lms.services;


import com.courzelo.lms.dto.FieldOfStudyDTO;
import com.courzelo.lms.entities.FieldOfStudy;
import com.courzelo.lms.repositories.FieldOfStudyRepository;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FieldOfStudyService {

    private final FieldOfStudyRepository fieldOfStudyRepository;

    public FieldOfStudyService(final FieldOfStudyRepository fieldOfStudyRepository) {
        this.fieldOfStudyRepository = fieldOfStudyRepository;
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
        return fieldOfStudyDTO;
    }

    private FieldOfStudy mapToEntity(final FieldOfStudyDTO fieldOfStudyDTO,
            final FieldOfStudy fieldOfStudy) {
        fieldOfStudy.setName(fieldOfStudyDTO.getName());
        fieldOfStudy.setNumbrWeeks(fieldOfStudyDTO.getNumbrWeeks());
        fieldOfStudy.setChefField(fieldOfStudyDTO.getChefField());
        return fieldOfStudy;
    }

}
