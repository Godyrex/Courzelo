package com.courzelo.lms.controllers.reclamation;

import com.courzelo.lms.dto.ReclamationDT;
import com.courzelo.lms.entities.reclamation.*;
import com.courzelo.lms.services.reclamation.ReclamationTypeService;
import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.exception.ResourceNotFoundException;
import com.courzelo.lms.dto.TrelloBoardDT;
import com.courzelo.lms.entities.user.User;
import com.courzelo.lms.repositories.ReclamationRepository;
import com.courzelo.lms.repositories.TrelloBoardRepository;
import com.courzelo.lms.services.user.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.courzelo.lms.services.IService.IReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/v1/reclamation")
@RestController
@RequiredArgsConstructor
@Slf4j
public class ReclamationController {
    private final IReclamationService IReclamationService;
    private final ReclamationRepository reclamationRepository;
    private final UserService userService;
    private final ReclamationTypeService reclamationTypeService;
    private final TrelloBoardRepository trellorepository;

    @PostMapping("/add9/{id}")
    public void addReclamation9(@RequestBody Reclamation reclamation ,@PathVariable String id) {
        //User user = userService.getUserByID(id);
        ReclamationType typerec = reclamationTypeService.findByType(id);
        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaa"+typerec);
       reclamation.setType(typerec);
        log.info("User mail" + reclamation );
        IReclamationService.saveReclamation(reclamation);
    }
    @PostMapping("/add8")
    public void addReclamation8(@RequestBody ReclamationDT reclamation ) {
        //User user = userService.getUserByID(id);
        ReclamationType typerec = reclamationTypeService.findByType(reclamation.getType());
        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaa"+typerec);
        Reclamation rec = new Reclamation();
        rec.setSujet(reclamation.getSujet());
        rec.setDetails(reclamation.getDetails());
        rec.setStatus(Status.EN_ATTENTE);
        rec.setType(typerec);
        log.info("User mail" + rec );
        IReclamationService.saveReclamation(rec);
    }
    @PostMapping("/add4")
    public void addReclamation4(@RequestBody Reclamation reclamation) {
        IReclamationService.saveReclamation(reclamation);
    }

    @PostMapping("/add")
    public void addReclamation(@RequestBody Reclamation reclamation, Principal p) {
        IReclamationService.ReclamationByUser(reclamation,p.getName());
    }

    @PostMapping("/add2")
    public void addpredRec(@RequestBody Reclamation reclamation) throws JsonProcessingException {
        IReclamationService.saveReclamation2(reclamation);
    }

    @PostMapping("/getType")
    public void getPredict(@RequestBody String details) throws JsonProcessingException {
        IReclamationService.predictType(details);
    }

    @GetMapping("/all")
    public List<Reclamation> getReclamations() {
        return IReclamationService.getAllReclamation();
    }
    @GetMapping("/get/{id}")
    public Optional<Reclamation> getReclamation(@PathVariable String id) {
        return IReclamationService.getReclamation( id);
    }

    @DeleteMapping("/delete/{ID}")
    public void deleteClass(@PathVariable String ID) {
        IReclamationService.deleteReclamation(ID);
    }

    @PutMapping("/update/{id}")
    public void updateClass(@RequestBody Reclamation reclamation,@PathVariable String id) {
        IReclamationService.updateReclamation(reclamation);
    }
    @PostMapping("/updateEmp/{id}/{idemp}")
    public void ReclamationToService(@PathVariable String id,@PathVariable String idemp) {
        Reclamation reclamation = IReclamationService.getReclamation(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reclamation not exist with id :" + id));
        User user = userService.getUserByID(idemp);

        IReclamationService.updateReclamation(reclamation);
    }

    @RequestMapping(path = "/update/status/{idReclamation}/{status}",method = RequestMethod.POST)
    public void updateStatus(@PathVariable("idReclamation") String reclamationId, @PathVariable("status") String status){
        Reclamation r = IReclamationService.getReclamation(reclamationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reclamation not exist with id :" + reclamationId));
        if (status.equals(Status.EN_ATTENTE.name()))
            r.setStatus(Status.EN_ATTENTE);
        else if (status.equals(Status.EN_COURS.name()))
            r.setStatus(Status.EN_COURS);
        else if (status.equals(Status.FINIE.name())){
            r.setStatus(Status.FINIE);}

        IReclamationService.updateReclamation(r);
    }

    @PutMapping("/rec")
    public ResponseEntity<Reclamation> updateReclamation(@RequestBody ReclamationDT reclamation){
        String id = reclamation.getId();
        Reclamation reclamation1 = IReclamationService.getReclamation(id)
                .orElseThrow(() -> new ResourceNotFoundException("reclamation not exist with id :" + id));
        System.out.println(reclamation1);
        reclamation1.setSujet(reclamation.getSujet());
        reclamation1.setDetails(reclamation.getDetails());
        ReclamationType typrec = reclamationTypeService.findByType(reclamation.getType());
        reclamation1.setType(typrec);
        reclamation1.setStatus(reclamation.getStatus());

        Reclamation updatedReclamation = reclamationRepository.save(reclamation1);
        return ResponseEntity.ok(updatedReclamation);
    }

    @DeleteMapping("/delete1/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable String id){
        Reclamation reclamation = IReclamationService.getReclamation(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reclamation not exist with id :" + id));
        // TrelloBoard t = trelloBoardRepository.findByReclamation(reclamationService.getReclamation(id));
        //trelloBoardRepository.delete();

        reclamationRepository.delete(reclamation);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @RequestMapping(path="/trello/add",method = RequestMethod.POST)
    public ResponseEntity<?> createBoard(@RequestBody TrelloBoardDT board ){
        TrelloBoard b = new TrelloBoard();
        b.setId(board.getIdBoard());
        b.setIdListToDo(board.getIdListToDo());
        b.setIdListDoing(board.getIdListDoing());
        b.setIdListDone(board.getIdListDone());
        //   b.setReclamations(projetService.getProjet(board.getProjet()));
        return ResponseEntity.ok(trellorepository.save(b));
    }

 /*   @RequestMapping(path="/trello/board",method = RequestMethod.GET)
    public TrelloBoard findBoard(@RequestParam("projet") String designation){
        Projet p = projetService.findByDesignation(designation);
        return trelloBoardRepository.findByProjet(p);
    }*/
 @GetMapping("/reclamations/details")
 public List<Reclamation> getReclamationsBySujetAndDetails(
         @RequestParam String sujet,
         @RequestParam String details) {
     return IReclamationService.getReclamationsBySujetAndDetails(sujet, details);
 }
}
