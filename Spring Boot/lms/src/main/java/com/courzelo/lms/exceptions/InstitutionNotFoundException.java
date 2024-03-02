package com.courzelo.lms.exceptions;

public class InstitutionNotFoundException extends RuntimeException{
    public InstitutionNotFoundException(String message) {
        super(message);
    }
}
