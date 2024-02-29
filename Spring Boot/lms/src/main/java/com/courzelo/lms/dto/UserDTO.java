package com.courzelo.lms.dto;

import com.courzelo.lms.entities.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Data
public class UserDTO {
    private String id;
    private String email;
    private String name;
    private String lastname;
    private List<Role> roles;
    private boolean ban;
    private boolean enabled;
}
