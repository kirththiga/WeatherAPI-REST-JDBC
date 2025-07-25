package com.weather.project.exception;

public class DatabaseException extends RuntimeException {

    public DatabaseException(String errorMessage){
        super(errorMessage);
    }
}
