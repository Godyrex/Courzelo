package com.courzelo.lms.services;

import com.courzelo.lms.entities.TypeReclamation;
import com.courzelo.lms.repositories.TypeReclamationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TypeReclamationService implements ITypeReclamationService{
    private final TypeReclamationRepository repository;

    @Override
    public Optional<TypeReclamation> getTypeReclamation(String id) {
        return repository.findById(id);
    }

    @Override
    public void addTypeReclamation(TypeReclamation type) {
         repository.save(type);
    }

    @Override
    public void deleteTypeReclamation(String id) {
        repository.deleteById(id);
    }

    @Override
    public void updateTypeReclamation(TypeReclamation type) {
        repository.save(type);
    }

    @Override
    public List<TypeReclamation> getTypeReclamations() {
        return repository.findAll();
    }
}
