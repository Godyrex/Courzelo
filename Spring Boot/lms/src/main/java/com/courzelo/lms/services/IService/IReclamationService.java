package com.courzelo.lms.services.IService;

import com.courzelo.lms.entities.reclamation.Reclamation;
import com.courzelo.lms.entities.reclamation.TypeReclamation;
import com.courzelo.lms.security.Response;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface IReclamationService {
    Optional<Reclamation> getReclamation(String id);
    List<Reclamation> getAllReclamation();

    void deleteReclamation(String id);
    List<Reclamation> findByType(TypeReclamation type);


    void saveReclamation(Reclamation reclamation);
    void saveReclamation2(Reclamation reclamation) throws JsonProcessingException;

    void updateReclamation(Reclamation reclamation);
    ResponseEntity<String> predictType(String programID) throws JsonProcessingException;
    ResponseEntity<Response> ReclamationByUser(Reclamation reclamation, String email);

    List<Reclamation> getReclamationsBySujetAndDetails(String sujet, String details);
}
