package com.courzelo.lms.dto.program;

import com.courzelo.lms.entities.institution.Program;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimplifiedProgramDTO {
    String id;
    String name;

    public SimplifiedProgramDTO(Program program) {
        this.id = program.getId();
        this.name = program.getName();
    }
    public static List<SimplifiedProgramDTO> fromList(List<Program> programs) {
        return programs.stream().map(SimplifiedProgramDTO::new).toList();
    }
}
