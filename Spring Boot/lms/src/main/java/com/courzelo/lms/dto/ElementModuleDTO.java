package com.courzelo.lms.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ElementModuleDTO {

    private Long id;

    private Integer nmbrHours;

    @Size(max = 255)
    private String name;

}
