package com.courzelo.lms.dto.program;

import com.courzelo.lms.entities.schedule.FieldOfStudy;
import com.courzelo.lms.entities.schedule.Modul;
import com.courzelo.lms.entities.schedule.Semester;
import com.courzelo.lms.entities.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimplifiedClassDTO {
    private String id;
    private String name;
}
