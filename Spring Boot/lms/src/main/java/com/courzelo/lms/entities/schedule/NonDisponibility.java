package com.courzelo.lms.entities.schedule;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;


@Document(collection = "NonDisponibility")
@Getter
@Setter
public class NonDisponibility {

    @Id
    private  String id;
    @NotNull
    private DayOfWeek dayOfWeek;
    @NotNull
    private Period period;

}
