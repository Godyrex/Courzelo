package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Period;
import com.courzelo.lms.entities.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class NonDisponibilityDTO {

    private String  id;

    private String day;

    private String period;

}