package com.courzelo.lms.services;

import com.courzelo.lms.entities.Program;
import com.courzelo.lms.repositories.ProgamRepository;
import com.courzelo.lms.services.IService.IProgrammeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgramService implements IProgrammeService {

    @Autowired
    ProgamRepository progRepository;
    @Override
    public Program saveProgram(Program program) {
        return progRepository.save(program);
    }

    @Override
    public void deleteProgram(String program) {
        progRepository.deleteById(program);
    }

    @Override
    public Program updateProgram(Program program) {
        return progRepository.save(program);
    }

    @Override
    public Program getProgramByID(String programID) {
        return progRepository.findById(programID).get();
    }

    @Override
    public List<Program> getPrograms() {
        return progRepository.findAll();
    }
}
