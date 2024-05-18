package com.courzelo.lms.services.reclamation;


import com.courzelo.lms.entities.reclamation.Reclamation;
import com.courzelo.lms.entities.reclamation.TypeReclamation;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.repositories.ReclamationRepository;
import com.courzelo.lms.repositories.UserRepository;
import com.courzelo.lms.security.Response;
import com.courzelo.lms.services.IService.IReclamationService;
import com.courzelo.lms.services.user.EmailService;
import com.courzelo.lms.services.user.IAuthService;
import com.courzelo.lms.services.user.IPhotoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReclamationService implements IReclamationService {
    private final ReclamationRepository repository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    private final UserRepository userRepository ;


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
    public List<Reclamation> findByType(TypeReclamation type) {
        return repository.findByType(type);
    }

    @Override
    public void saveReclamation(Reclamation reclamation) {
        repository.save(reclamation);
    }

    @Override
    public void updateReclamation(Reclamation reclamation) {
        repository.save(reclamation);

    }

    @Override
    public ResponseEntity<String> predictType(String details) throws JsonProcessingException {
        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);


        // Create request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("description", details);
        String requestBodyJson = objectMapper.writeValueAsString(requestBody);

        // Create request
        HttpEntity<String> request = new HttpEntity<>(requestBodyJson, headers);

        // Make a POST request
        ResponseEntity<String> programNameResponse = restTemplate.exchange(
                "http://localhost:5000/api/predict",
                HttpMethod.POST,
                request,
                String.class
        );

        // Deserialize the response as a JSON object
        JsonNode responseJson = objectMapper.readTree(programNameResponse.getBody());

        // Extract the predicted type
        String predictedType = responseJson.get("predicted_type").asText();

        // Log and return the predicted type
        log.info("Predicted type: " + predictedType);
        TypeReclamation rec = TypeReclamation.valueOf(predictedType.toUpperCase());
        log.info("Type Reclamation : " + rec);
        return ResponseEntity.ok(predictedType);
    }

    @Override
    public void saveReclamation2(Reclamation reclamation) throws JsonProcessingException {
     /*   HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String details = reclamation.getDetails();
        // Create request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("description", details);
        String requestBodyJson = objectMapper.writeValueAsString(requestBody);

        // Create request
        HttpEntity<String> request = new HttpEntity<>(requestBodyJson, headers);

        // Make a POST request
        ResponseEntity<String> programNameResponse = restTemplate.exchange(
                "http://localhost:5000/api/predict",
                HttpMethod.POST,
                request,
                String.class
        );

        // Deserialize the response as a JSON object
        JsonNode responseJson = objectMapper.readTree(programNameResponse.getBody());

        // Extract the predicted type
        String predictedType = responseJson.get("predicted_type").asText();

        // Log and return the predicted type
        log.info("Predicted type: " + predictedType);
        if (predictedType.equalsIgnoreCase("Finance")){
            TypeReclamation rec = TypeReclamation.FINANACE;
            log.info("Type Reclamation : " + rec);
            reclamation.setType(rec);
            repository.save(reclamation);
        }
        else {
            TypeReclamation rec = TypeReclamation.valueOf(predictedType.toUpperCase());
            log.info("Type Reclamation : " + rec);
            reclamation.setType(rec);
            repository.save(reclamation);}*/
    }

    public ResponseEntity<Response> ReclamationByUser(Reclamation reclamation, String email) {
        log.info("User mail" + email );
        User user = userRepository.findUserByEmail(email);
        log.info("Reclamation By :" );
 //       reclamation.setClient(user);
        repository.save(reclamation);
        log.info("changePassword :Password Changed!");
        return ResponseEntity.ok().body(new Response("Password updated!"));
    }

    @Override
    public List<Reclamation> getReclamationsBySujetAndDetails(String sujet, String details) {
        return repository.findBySujetAndDetails(sujet, details);
    }
}

