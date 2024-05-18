package com.courzelo.lms.services.reclamation;

import com.courzelo.lms.entities.reclamation.Reclamation;
import com.courzelo.lms.entities.reclamation.ReclamationType;
import com.courzelo.lms.repositories.ReclamationTypeRepository;
import com.courzelo.lms.services.IService.IReclamationType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationTypeService implements IReclamationType {
    private final ReclamationTypeRepository reclamationTypeRepository;

    @Autowired
    public ReclamationTypeService(ReclamationTypeRepository reclamationTypeRepository) {
        this.reclamationTypeRepository = reclamationTypeRepository;
    }

    public List<ReclamationType> findAll() {
        return reclamationTypeRepository.findAll();
    }

    public Optional<ReclamationType> findById(String id) {
        return reclamationTypeRepository.findById(id);
    }

    public ReclamationType save(ReclamationType reclamationType) {
        return reclamationTypeRepository.save(reclamationType);
    }
    public void deleteById(String id) {
        reclamationTypeRepository.deleteById(id);
    }
    @Override
    public ReclamationType findByType(String type) {
        return reclamationTypeRepository.findByType(type);
    }
}
