package com.weather.project.controller;

import com.weather.project.model.Favorite;
import com.weather.project.service.WeatherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
@CrossOrigin
public class FavoriteController {

    private final WeatherService service;

    @GetMapping
    public ResponseEntity<List<Favorite>> getAll(){
        List<Favorite> result = service.getAll();

        if (result.isEmpty()) {
            return ResponseEntity.status(NO_CONTENT).body(result);
        }

        return ResponseEntity.status(OK).body(result);
    }

    @PostMapping
    public ResponseEntity<Favorite> addFavorite(@RequestParam String city, @RequestParam boolean visited, @RequestParam String label, @RequestParam int ranking){
        Favorite newFavorite = service.addFavorite(city, visited, label, ranking);
        return ResponseEntity.status(CREATED).body(newFavorite);
    }

    @DeleteMapping("/city/{city}")
    public ResponseEntity<Boolean> removeFavoriteByCity(@PathVariable String city){
        service.removeFavoriteByCity(city);
        return ResponseEntity.status(NO_CONTENT).body(true);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> removeFavoriteById(@PathVariable int id){
        service.removeFavoriteById(id);
        return ResponseEntity.status(NO_CONTENT).body(true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Favorite> getFavoriteById(@PathVariable int id){
        Favorite favorite = service.getFavoriteById(id);

        if (favorite == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(OK).body(favorite);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<Favorite> getFavoriteByCity(@PathVariable String city){
        Favorite favorite = service.getFavoriteByCity(city);

        if (favorite == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(OK).body(favorite);
    }

    @PutMapping("/label")
    public ResponseEntity<Favorite> updateLabelByCity(@RequestParam String city, @RequestParam String label){
        Favorite favorite = service.updateLabelByCity(city, label);

        if (favorite == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(OK).body(favorite);
    }

    @PutMapping("/ranking")
    public ResponseEntity<Favorite> updateRankingByCity(@RequestParam String city, @RequestParam int ranking){
        Favorite favorite = service.updateRankingByCity(city, ranking);

        if (favorite == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(OK).body(favorite);
    }
}
