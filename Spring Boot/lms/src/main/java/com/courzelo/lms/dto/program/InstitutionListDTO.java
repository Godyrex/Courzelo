package com.courzelo.lms.dto.program;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InstitutionListDTO {
    List<InstitutionDTO> institutions;
    int totalPages;

}
