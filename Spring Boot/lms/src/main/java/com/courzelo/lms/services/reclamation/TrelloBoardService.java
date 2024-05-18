package com.courzelo.lms.services.reclamation;

import com.courzelo.lms.entities.reclamation.ReclamationType;
import com.courzelo.lms.entities.reclamation.TrelloBoard;
import com.courzelo.lms.repositories.TrelloBoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class TrelloBoardService {
    private final TrelloBoardRepository trelloBoardRepository;
    private ReclamationTypeService reclamationTypeService;


    @Autowired
    public TrelloBoardService(TrelloBoardRepository trelloBoardRepository) {
        this.trelloBoardRepository = trelloBoardRepository;
    }

    public ResponseEntity<?> createTrelloBoard(@RequestParam(required = false) String typeId) {
        ReclamationType reclamationType = null;

        if (typeId != null) {
            Optional<ReclamationType> reclamationTypeOpt = reclamationTypeService.findById(typeId);
            if (reclamationTypeOpt.isPresent()) {
                reclamationType = reclamationTypeOpt.get();
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        // Logic to create a Trello board
        // Pass reclamationType if it's not null

        return ResponseEntity.ok("Trello board created successfully");
    }

    public List<TrelloBoard> findAll() {
        return trelloBoardRepository.findAll();
    }

    public Optional<TrelloBoard> findById(String id) {
        return trelloBoardRepository.findById(id);
    }

    public TrelloBoard save(TrelloBoard trelloBoard) {
        return trelloBoardRepository.save(trelloBoard);
    }

    public void deleteById(String id) {
        trelloBoardRepository.deleteById(id);
    }

    public TrelloBoard findByType(ReclamationType type) {
        return trelloBoardRepository.findByType(type);
    }
}

