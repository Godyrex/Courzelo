package com.courzelo.lms.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "tokens")
public class Token {
    @Id
    private String id;
    @NotNull
    private String tokenCode;
    private boolean valid;
    private boolean expired;
}
