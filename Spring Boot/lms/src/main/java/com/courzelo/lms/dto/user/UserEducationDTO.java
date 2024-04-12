package com.courzelo.lms.dto.user;

import com.courzelo.lms.dto.program.InstitutionDTO;
import com.courzelo.lms.dto.program.SimplifiedClassDTO;
import com.courzelo.lms.dto.program.SimplifiedInstitutionDTO;
import com.courzelo.lms.dto.program.SimplifiedProgramDTO;
import com.courzelo.lms.entities.user.UserEducationalDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEducationDTO {
    private SimplifiedInstitutionDTO institution;
    private SimplifiedClassDTO stclass;
    private List<SimplifiedProgramDTO> program;

    public UserEducationDTO(UserEducationalDetails education) {
        if (education != null) {
            this.institution = education.getInstitution() != null ? new SimplifiedInstitutionDTO(education.getInstitution()) : null;
            this.stclass = education.getStclass() != null ? new SimplifiedClassDTO(education.getStclass()) : null;
            this.program = education.getProgram() != null ? SimplifiedProgramDTO.fromList(education.getProgram()) : null;
        }
    }
}
