package com.courzelo.lms.dto.user;

import com.courzelo.lms.entities.schedule.ElementModule;
import com.courzelo.lms.entities.schedule.NonDisponibility;
import com.courzelo.lms.entities.schedule.Teacher;
import com.courzelo.lms.entities.user.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;
@Data
public class UserDTO extends Teacher {
    private String id;
    private String email;
    private String name;
    private String password;
    private String lastname;
    private List<Role> roles;
    private boolean ban;
    private boolean enabled;
    private String speciality;
    private String tel;
}
