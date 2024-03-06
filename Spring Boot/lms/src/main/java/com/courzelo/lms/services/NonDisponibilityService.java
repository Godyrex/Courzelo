package com.courzelo.lms.services;


import com.courzelo.lms.dto.NonDisponibilityDTO;
import com.courzelo.lms.entities.NonDisponibility;
import com.courzelo.lms.repositories.NonDisponibilityRepository;
import com.courzelo.lms.utils.NotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NonDisponibilityService {

    private final NonDisponibilityRepository nonDisponibilityRepository;

    public NonDisponibilityService(final NonDisponibilityRepository nonDisponibilityRepository) {
        this.nonDisponibilityRepository = nonDisponibilityRepository;
    }
    

    public List<NonDisponibilityDTO> findAll() {
        final List<NonDisponibility> nonDisponibilities = nonDisponibilityRepository.findAll(Sort.by("id"));
        return nonDisponibilities.stream()
                .map(nonDisponibility -> mapToDTO(nonDisponibility, new NonDisponibilityDTO()))
                .toList();
    }

    public NonDisponibilityDTO get(final String id) {
        return nonDisponibilityRepository.findById(id)
                .map(nonDisponibility -> mapToDTO(nonDisponibility, new NonDisponibilityDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final NonDisponibilityDTO nonDisponibilityDTO) {
        final NonDisponibility nonDisponibility = new NonDisponibility();
        mapToEntity(nonDisponibilityDTO, nonDisponibility);

        return nonDisponibilityRepository.save(nonDisponibility).getId();
    }

    public void update(final String id, final NonDisponibilityDTO nonDisponibilityDTO) {
        final NonDisponibility nonDisponibility = nonDisponibilityRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(nonDisponibilityDTO, nonDisponibility);
        nonDisponibilityRepository.save(nonDisponibility);
    }

    public void delete(final String id) {
        nonDisponibilityRepository.deleteById(id);
    }

    private NonDisponibilityDTO mapToDTO(final NonDisponibility nonDisponibility,
            final NonDisponibilityDTO nonDisponibilityDTO) {
        nonDisponibilityDTO.setId(nonDisponibilityDTO.getId());
        nonDisponibilityDTO.setDay(nonDisponibility.getDay());
        nonDisponibilityDTO.setPeriod(nonDisponibility.getPeriod());
        return nonDisponibilityDTO;
    }


    private NonDisponibility mapToEntity(final NonDisponibilityDTO nonDisponibilityDTO,
                                         final NonDisponibility nonDisponibility) {
        nonDisponibility.setId(nonDisponibilityDTO.getId());
     nonDisponibility.setDay(nonDisponibilityDTO.getDay());
        nonDisponibility.setPeriod(nonDisponibilityDTO.getPeriod());
        return nonDisponibility;
    }

}
