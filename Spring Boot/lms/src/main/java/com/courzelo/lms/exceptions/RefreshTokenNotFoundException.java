package com.courzelo.lms.exceptions;

public class RefreshTokenNotFoundException extends RuntimeException{
    public RefreshTokenNotFoundException(String message) {
        super(message);
    }
}
