package com.courzelo.lms.entities.user;

import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.institution.Institution;
import com.courzelo.lms.entities.institution.Program;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.NonDisponibility;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserEducationalDetails {
    @DBRef
    private Institution institution;
    @DBRef
    private Class stclass;
    @DBRef
    private List<Program> programs = new ArrayList<>();
    @DBRef
    private List<ElementModule>elementModules;
    @DBRef
    private List<NonDisponibility>nonDisponibilities;
    public List<Program> getProgram() {
        return programs;
    }
}
