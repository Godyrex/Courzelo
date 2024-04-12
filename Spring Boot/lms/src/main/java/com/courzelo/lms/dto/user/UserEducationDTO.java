package com.courzelo.lms.dto.user;

import com.courzelo.lms.dto.program.InstitutionDTO;
import com.courzelo.lms.dto.program.SimplifiedClassDTO;
import com.courzelo.lms.dto.program.SimplifiedInstitutionDTO;
import com.courzelo.lms.dto.program.SimplifiedProgramDTO;
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
}
