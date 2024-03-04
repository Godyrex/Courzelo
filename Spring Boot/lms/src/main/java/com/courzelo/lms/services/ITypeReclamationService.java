package com.courzelo.lms.services;


import com.courzelo.lms.entities.TypeReclamation;

import java.util.List;
import java.util.Optional;

public interface ITypeReclamationService {
    Optional<TypeReclamation> getTypeReclamation(String id);


    void addTypeReclamation(TypeReclamation type);
    void deleteTypeReclamation(String id);

    void updateTypeReclamation(TypeReclamation type);

    List<TypeReclamation> getTypeReclamations();

}
