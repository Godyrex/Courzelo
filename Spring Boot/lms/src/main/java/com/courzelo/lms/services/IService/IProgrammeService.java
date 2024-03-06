package com.courzelo.lms.services.IService;

import com.courzelo.lms.entities.Program;

import java.util.List;

public interface IProgrammeService {



    Program saveProgram(Program program);
    void deleteProgram(String program);
    Program updateProgram (Program program);
    Program getProgramByID(String programID);
    List<Program> getPrograms();
}
