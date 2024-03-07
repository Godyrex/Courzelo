package com.courzelo.lms.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "NonDisponibility")
@Getter
@Setter
public class NonDisponibility {

    @Id
    private  String id;
    @NotNull
   private String day;
    @NotNull
   private String period;

}
