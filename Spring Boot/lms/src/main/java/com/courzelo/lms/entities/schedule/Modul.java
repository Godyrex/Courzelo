package com.courzelo.lms.entities.schedule;

import com.courzelo.lms.dto.program.ClassDTO;
import com.courzelo.lms.entities.institution.Class;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection =  "Module")
@Data
public class Modul {
    @Id
    private String id;
    private Integer nmbrHours;
    @Size(max = 255)
    private String name;
    private Boolean isSeperated;
    private Boolean isMetuale;
    @DBRef
    private Class aClass;
    @DBRef
    private List<ElementModule>elementModules;
    public boolean isMetuale() {
        return false;
    }
    public boolean isSeperated() {
        return false;
    }
}
