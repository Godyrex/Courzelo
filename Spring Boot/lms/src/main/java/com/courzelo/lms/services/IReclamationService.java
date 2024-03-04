package com.courzelo.lms.services;

import com.courzelo.lms.entities.Reclamation;

import java.util.List;
import java.util.Optional;

public interface IReclamationService {
        Optional<Reclamation> getReclamation(String id);
        List<Reclamation> getAllReclamation();

        void deleteReclamation(String id);

        void saveReclamation(Reclamation reclamation);

        void updateReclamation(Reclamation reclamation);

}
