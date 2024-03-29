package com.courzelo.lms.dto.schedule;

import com.courzelo.lms.entities.institution.Class;
import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.Modul;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
@Getter
@Setter
public class ModulDTO {
    @Size(max = 255)
    private String id;
    private Integer nmbrHours;
    @Size(max = 255)
    private String name;
    @JsonProperty("isSeperated")
    private Boolean isSeperated;
    @JsonProperty("isMetuale")
    private Boolean isMetuale;
    private List<ElementModule> elementModules;
    private Class aClass;

    public boolean isMetuale() {
        return false;
    }

    public boolean isSeperated() {
        return false;
    }
}
