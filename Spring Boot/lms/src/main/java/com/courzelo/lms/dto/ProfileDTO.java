package com.courzelo.lms.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProfileDTO {

    private String name;

    private String lastName;
}
