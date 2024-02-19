package com.courzelo.lms.services;


import com.courzelo.lms.dto.DepartementDTO;
import com.courzelo.lms.entities.Departement;
import com.courzelo.lms.utils.NotFoundException;
import com.courzelo.lms.repositories.DepartementRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DepartementService {

    private final DepartementRepository departementRepository;

    public DepartementService(final DepartementRepository departementRepository) {
        this.departementRepository = departementRepository;
    }

    public List<DepartementDTO> findAll() {
        final List<Departement> departements = departementRepository.findAll(Sort.by("id"));
        return departements.stream()
                .map(departement -> mapToDTO(departement, new DepartementDTO()))
                .toList();
    }

    public DepartementDTO get(final String id) {
        return departementRepository.findById(id)
                .map(departement -> mapToDTO(departement, new DepartementDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public String create(final DepartementDTO departementDTO) {
        final Departement departement = new Departement();
        mapToEntity(departementDTO, departement);
        return departementRepository.save(departement).getId();
    }

    public void update(final String id, final DepartementDTO departementDTO) {
        final Departement departement = departementRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(departementDTO, departement);
        departementRepository.save(departement);
    }

    public void delete(final String id) {
        departementRepository.deleteById(id);
    }

    private DepartementDTO mapToDTO(final Departement departement,
            final DepartementDTO departementDTO) {
        departementDTO.setId(departement.getId());
        departementDTO.setName(departement.getName());
        return departementDTO;
    }

    private Departement mapToEntity(final DepartementDTO departementDTO,
            final Departement departement) {
        departement.setName(departementDTO.getName());
        return departement;
    }

}
