package com.courzelo.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ClassListDTO {
    List<ClassDTO> classes;
    int totalPages;
}
