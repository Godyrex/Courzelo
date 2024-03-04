package com.courzelo.lms.services;

import com.courzelo.lms.entities.Reclamation;
import com.courzelo.lms.repositories.ReclamationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReclamationService implements IReclamationService{
    private final ReclamationRepository repository;
    @Override
    public Optional<Reclamation> getReclamation(String id) {
        return repository.findById(id);
    }

    @Override
    public List<Reclamation> getAllReclamation() {
        return repository.findAll();
    }

    @Override
    public void deleteReclamation(String id) {
        repository.deleteById(id);
    }

    @Override
    public void saveReclamation(Reclamation reclamation) {
        repository.save(reclamation);
    }

    @Override
    public void updateReclamation(Reclamation reclamation) {
        repository.save(reclamation);
    }
}
