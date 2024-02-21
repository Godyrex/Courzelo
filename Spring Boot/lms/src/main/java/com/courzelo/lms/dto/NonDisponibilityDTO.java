package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Role;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class NonDisponibilityDTO {

    private String  id;
    private DayOfWeek dayOfWeek;
    private List<Role>roles;

}
