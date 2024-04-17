package com.courzelo.lms.dto.program;

import com.courzelo.lms.entities.schedule.FieldOfStudy;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.entities.schedule.Semester;
import com.courzelo.lms.entities.user.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ClassDTO {
    private String id;
    private String name;
    private Integer capacity;
    private List<User> teachers;
    private List<Modul> moduls;
    private FieldOfStudy fieldOfStudy;
    private Semester semester;
}
