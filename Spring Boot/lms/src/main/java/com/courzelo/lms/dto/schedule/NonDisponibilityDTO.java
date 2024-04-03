package com.courzelo.lms.dto.schedule;

import com.courzelo.lms.entities.schedule.Period;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
public class NonDisponibilityDTO {
    private String  id;
    private DayOfWeek dayOfWeek;
    private Period period;
}
