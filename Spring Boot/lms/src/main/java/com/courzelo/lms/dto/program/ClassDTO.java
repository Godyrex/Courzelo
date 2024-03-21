package com.courzelo.lms.dto.program;

import com.courzelo.lms.entities.schedule.FieldOfStudy;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.entities.schedule.Semester;
import lombok.Data;

import java.util.List;

@Data
public class ClassDTO {
    private String id;
    private String name;
    private Long capacity;
    private List<Modul> moduls;
    private FieldOfStudy fieldOfStudy;
    private Semester semester;
}
