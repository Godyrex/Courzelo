package com.courzelo.lms.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/TimeTable", produces = MediaType.APPLICATION_JSON_VALUE)
public class TimeTable {
}