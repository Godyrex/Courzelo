package com.courzelo.lms.entities.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "searches")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Search {

    @Id
    private String id;
    private String query;

    public Search(String query) {
        this.query = query;
    }
}
