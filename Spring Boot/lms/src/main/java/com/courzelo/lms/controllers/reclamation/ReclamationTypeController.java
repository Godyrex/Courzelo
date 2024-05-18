package com.courzelo.lms.controllers.reclamation;

import com.courzelo.lms.entities.reclamation.ReclamationType;
import com.courzelo.lms.entities.reclamation.TrelloBoard;
import com.courzelo.lms.repositories.TrelloBoardRepository;
import com.courzelo.lms.dto.TrelloBoardDT;
import com.courzelo.lms.services.reclamation.ReclamationTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/typereclamation")
@RestController
@RequiredArgsConstructor
public class ReclamationTypeController {

    private final ReclamationTypeService reclamationTypeService;
    private final TrelloBoardRepository trellorepository;


    @GetMapping("/all")
    public List<ReclamationType> getAllReclamationTypes() {
        return reclamationTypeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReclamationType> getReclamationTypeById(@PathVariable String id) {
        return reclamationTypeService.findById(id)
                .map(reclamationType -> ResponseEntity.ok().body(reclamationType))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/type/{id}")
    public ReclamationType getReclamationTypeByType(@PathVariable String id) {
        return reclamationTypeService.findByType(id);
    }

    @RequestMapping(path="/trello/add",method = RequestMethod.POST)
    public ResponseEntity<?> createBoard(@RequestBody TrelloBoardDT board){
        TrelloBoard b = new TrelloBoard();
        b.setId(board.getIdBoard());
        b.setIdListToDo(board.getIdListToDo());
        b.setIdListDoing(board.getIdListDoing());
        b.setIdListDone(board.getIdListDone());
        System.out.println("++++++++++++"+reclamationTypeService.findByType(board.getType()));
        b.setType(reclamationTypeService.findByType(board.getType()));
        System.out.println("-------->>>>>>"+b.getType());
        //b.setType(ReclamationTypeService.get(board.getProjet()));
        return ResponseEntity.ok(trellorepository.save(b));
    }

    @PostMapping("/add")
    public ReclamationType createReclamationType(@RequestBody ReclamationType reclamationType) {
        return reclamationTypeService.save(reclamationType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReclamationType> updateReclamationType(@PathVariable String id, @RequestBody ReclamationType reclamationTypeDetails) {
        return reclamationTypeService.findById(id)
                .map(reclamationType -> {
                    reclamationType.setType(reclamationTypeDetails.getType());
                    ReclamationType updatedReclamationType = reclamationTypeService.save(reclamationType);
                    return ResponseEntity.ok().body(updatedReclamationType);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReclamationType(@PathVariable String id) {
        return reclamationTypeService.findById(id)
                .map(reclamationType -> {
                    reclamationTypeService.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }

}