package com.courzelo.lms.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class DepartementDTO {

    private String  id;

    @Size(max = 255)
    private String name;

}
