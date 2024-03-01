package com.courzelo.lms.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.OffsetDateTime;
import java.util.List;


@Document(collection = "NonDisponibility")
@Getter
@Setter
public class NonDisponibility {

    @Id
    private  String id;
    @NotNull
    private DayOfWeek dayOfWeek;
    @NotNull
    private List<Role> roles;
    @NotNull
    private Period period;

}
