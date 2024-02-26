package com.courzelo.lms.entities;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.OffsetDateTime;


@Document(collation = "ElementModules")
@Getter
@Setter
public class ElementModule {

    @Id
    private  String id;

    private Integer nmbrHours;

    @Size(max = 255)
    private String name;




    @Enumerated(EnumType.STRING)
    private DayOfWeek jour;
    @Enumerated(EnumType.STRING)
    private Period period;

}
