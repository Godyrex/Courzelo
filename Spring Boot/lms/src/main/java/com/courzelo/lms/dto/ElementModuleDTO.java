package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Period;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class ElementModuleDTO {

    private String  id;

    private Integer nmbrHours;
 //private List<>
    @Size(max = 255)
    private String name;
    private DayOfWeek jour;
    private Period period;

}
