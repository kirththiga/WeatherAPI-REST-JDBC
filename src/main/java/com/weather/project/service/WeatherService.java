package com.weather.project.service;

import com.weather.project.adapter.WeatherAdapter;
import com.weather.project.model.Favorite;
import com.weather.project.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeatherService {

    private final WeatherAdapter adapter;
    private final FavoriteRepository repository;

    @Autowired
    public WeatherService(WeatherAdapter adapter, FavoriteRepository repository) {
        this.adapter = adapter;
        this.repository = repository;
    }

    public List<Favorite> getAll(){
        return repository.getAll();
    }

    public Favorite addFavorite(String city, boolean visited, String label, int ranking) {
        Favorite favorite = adapter.getWeatherByCity(city);
        favorite.setVisited(visited);

        if(label != null) {
            favorite.setLabel(label);
        } else {
            favorite.setLabel("None");
        }

        favorite.setRanking(ranking);

        return repository.save(favorite);
    }

    public void removeFavoriteByCity(String city){
        repository.removeByCity(city);
    }

    public void removeFavoriteById(int id){
        repository.removeById(id);
    }

    public Favorite getFavoriteById(int id) {
        return repository.getFavoriteById(id);
    }

    public Favorite getFavoriteByCity(String city) {
        return repository.getFavoriteByCity(city);
    }

    public Favorite updateLabelByCity(String city, String newLabel) {
        return repository.updateLabelByCity(city, newLabel);
    }

    public Favorite updateRankingByCity(String city, int newRanking) {
        return repository.updateRankingByCity(city, newRanking);
    }
}
