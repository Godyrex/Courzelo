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
    private String lastName;
    private List<Role> roles;
    private String grade;
    private String speciality;
    private List<String> courses;
}
