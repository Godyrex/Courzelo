package com.courzelo.lms.controllers.reclamation;

import com.courzelo.lms.entities.reclamation.ReclamationType;
import com.courzelo.lms.entities.reclamation.TrelloBoard;
import com.courzelo.lms.services.reclamation.ReclamationTypeService;
import com.courzelo.lms.services.reclamation.TrelloBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/board")
public class TrelloBoardController {

    private final TrelloBoardService trelloBoardService;
    private final ReclamationTypeService reclamationTypeService;

    @Autowired
    public TrelloBoardController(TrelloBoardService trelloBoardService, ReclamationTypeService reclamationTypeService) {
        this.trelloBoardService = trelloBoardService;
        this.reclamationTypeService = reclamationTypeService;
    }

    @GetMapping
    public List<TrelloBoard> getAllTrelloBoards() {
        return trelloBoardService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrelloBoard> getTrelloBoardById(@PathVariable String id) {
        return trelloBoardService.findById(id)
                .map(trelloBoard -> ResponseEntity.ok().body(trelloBoard))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTrelloBoard(@RequestParam(required = false) String typeId) {
        if (typeId == null) {
            return ResponseEntity.badRequest().body("typeId must not be null");
        }

        Optional<ReclamationType> reclamationTypeOpt = reclamationTypeService.findById(typeId);
        if (!reclamationTypeOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        ReclamationType reclamationType = reclamationTypeOpt.get();
        // Your logic to create a Trello board using the reclamationType

        return ResponseEntity.ok("Trello board created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrelloBoard> updateTrelloBoard(@PathVariable String id, @RequestBody TrelloBoard trelloBoardDetails) {
        return trelloBoardService.findById(id)
                .map(trelloBoard -> {
                    trelloBoard.setIdListToDo(trelloBoardDetails.getIdListToDo());
                    trelloBoard.setIdListDoing(trelloBoardDetails.getIdListDoing());
                    trelloBoard.setIdListDone(trelloBoardDetails.getIdListDone());

                    if (trelloBoardDetails.getType() != null) {
                        ReclamationType type = reclamationTypeService.findById(trelloBoardDetails.getType().getId()).orElse(null);
                        trelloBoard.setType(type);
                    } else {
                        trelloBoard.setType(null);
                    }

                    TrelloBoard updatedTrelloBoard = trelloBoardService.save(trelloBoard);
                    return ResponseEntity.ok().body(updatedTrelloBoard);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTrelloBoard(@PathVariable String id) {
        return trelloBoardService.findById(id)
                .map(trelloBoard -> {
                    trelloBoardService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/bytype")
    public TrelloBoard findBoard(@RequestParam("type") String type) {
        ReclamationType reclamationType = reclamationTypeService.findByType(type);
        return trelloBoardService.findByType(reclamationType);
    }
}