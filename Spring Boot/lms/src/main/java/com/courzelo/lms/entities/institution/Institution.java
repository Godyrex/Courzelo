package com.courzelo.lms.entities.institution;


import com.courzelo.lms.entities.user.User;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document(collection = "institutions")
@Data
public class Institution {
    @Id
    private String id;
    private String name;
    private String location;
    private String description;
    private String website;
    @DBRef
    private List<User> admins = new ArrayList<>();
    @DBRef
    private List<User> teachers = new ArrayList<>();
    @DBRef
    private List<User> students = new ArrayList<>();
    @DBRef
    private List<Program> programs = new ArrayList<>();
    private byte[] excelFile;
    private double latitude;
    private double longitude;

}
