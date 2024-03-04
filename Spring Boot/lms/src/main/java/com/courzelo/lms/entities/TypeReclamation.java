package com.courzelo.lms.entities;

<<<<<<< Updated upstream
public enum TypeReclamation {
    Finance,
    Absance,
    Note
}

=======
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class TypeReclamation {
    @Id
    private String type_id;
    @Size(max = 255)
    private String type ;

    public TypeReclamation(String type) {
        this.type = type;
    }
}
>>>>>>> Stashed changes
