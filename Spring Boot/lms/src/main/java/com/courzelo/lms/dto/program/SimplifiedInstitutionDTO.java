package com.courzelo.lms.dto.program;

import com.courzelo.lms.entities.institution.Institution;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimplifiedInstitutionDTO {
    String id;
    String name;

    public SimplifiedInstitutionDTO(Institution institution) {
        this.id = institution.getId();
        this.name = institution.getName();
    }
}
