package com.courzelo.lms.entities;

import jakarta.persistence.Id;
import lombok.Data;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "photos")
@Data
public class Photo {
    @Id
    private String id;

    private String title;

    private Binary image;

    public Photo(String title) {
        this.title = title;
    }
}
