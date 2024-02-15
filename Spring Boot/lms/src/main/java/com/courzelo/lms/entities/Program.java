package com.courzelo.lms.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
@Getter
@Setter
@Document(collection = "program")
public class Program {
}
