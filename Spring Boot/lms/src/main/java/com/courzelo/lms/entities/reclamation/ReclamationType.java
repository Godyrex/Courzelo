package com.courzelo.lms.entities.reclamation;

import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
public class ReclamationType {
    @Id
    private String id;

    @Size(max = 255)
    private String type;
}
