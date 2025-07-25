package com.weather.project.exception;

public class FavoriteNotFoundException extends RuntimeException {
    public FavoriteNotFoundException(String errorMessage){
        super(errorMessage);
    }
}
