package com.courzelo.lms.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "modules")
@Getter
@Setter
public class Module {

}
