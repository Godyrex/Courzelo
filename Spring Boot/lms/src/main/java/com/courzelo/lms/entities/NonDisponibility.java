package com.courzelo.lms.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;


@Document(collection = "NonDisponibility")
@Getter
@Setter
public class NonDisponibility {

    @Id
    private  String id;

}
