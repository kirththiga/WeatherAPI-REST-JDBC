package com.weather.project.repository;

import com.weather.project.exception.DatabaseException;
import com.weather.project.exception.FavoriteNotFoundException;
import com.weather.project.model.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavoriteRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FavoriteRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Favorite> getAll(){
        String sqlQuery = "SELECT ID, NAME, REGION, COUNTRY, VISITED, LABEL, RANKING FROM FAVORITES";
        List<Favorite> result = jdbcTemplate.query(sqlQuery, new FavoriteRowMapper());

        return result;
    }

    public Favorite save(Favorite favorite) {

        String sqlQuery = "INSERT INTO FAVORITES (NAME, REGION, COUNTRY, VISITED, LABEL, RANKING) VALUES(?,?,?,?,?,?)";
        jdbcTemplate.update(sqlQuery, favorite.getName(), favorite.getRegion(), favorite.getCountry(), favorite.isVisited(), favorite.getLabel(), favorite.getRanking());

        int favoriteId = jdbcTemplate.queryForObject("SELECT MAX(ID) from FAVORITES", Integer.class);

        return new Favorite(favoriteId, favorite.getName(), favorite.getRegion(), favorite.getCountry(), favorite.isVisited(), favorite.getLabel(), favorite.getRanking());
    }

    public boolean removeByCity(String city) {
        jdbcTemplate.update("DELETE FROM FAVORITES WHERE NAME= ?", city);

        return true;
    }

    public boolean removeById(int id) {
        jdbcTemplate.update("DELETE FROM FAVORITES WHERE ID= ?", id);

        return true;
    }

    public Favorite getFavoriteById(int id) {

        try {
            String sqlQuery = "SELECT ID, NAME, REGION, COUNTRY, VISITED, LABEL, RANKING FROM FAVORITES WHERE ID = ?";
            List<Favorite> result = jdbcTemplate.query(sqlQuery, new FavoriteRowMapper(), id);

            if (result.isEmpty()) {
                throw new FavoriteNotFoundException("Favorite city with id " + id + " not found");
            }

            return result.get(0);
        } catch (Exception e) {
            throw new DatabaseException("Unexpected database operation exception " + e.getMessage());
        }
    }

    public Favorite getFavoriteByCity(String city) {

        try {
            String sqlQuery = "SELECT ID, NAME, REGION, COUNTRY, VISITED, LABEL, RANKING FROM FAVORITES WHERE NAME = ?";
            List<Favorite> result = jdbcTemplate.query(sqlQuery, new FavoriteRowMapper(), city);

            if (result.isEmpty()) {
                throw new FavoriteNotFoundException("Favorite city " + city + " not found");
            }

            return result.get(0);
        } catch (Exception e) {
            throw new DatabaseException("Unexpected database operation exception " + e.getMessage());
        }
    }

    public Favorite updateLabelByCity(String city, String newLabel) {
        try {
            String sqlQuery = "UPDATE FAVORITES SET LABEL = ? WHERE NAME = ?";
            jdbcTemplate.update(sqlQuery, newLabel, city);

            Favorite updatedFavorite = getFavoriteByCity(city);

            if (updatedFavorite == null) {
                throw new FavoriteNotFoundException("Favorite city " + city + " not found");
            }

            return updatedFavorite;
        } catch (Exception e) {
            throw new DatabaseException("Unexpected database operation exception " + e.getMessage());
        }
    }

    public Favorite updateRankingByCity(String city, int newRanking) {
        try {
            String sqlQuery = "UPDATE FAVORITES SET RANKING = ? WHERE NAME = ?";
            jdbcTemplate.update(sqlQuery, newRanking, city);

            Favorite updatedFavorite = getFavoriteByCity(city);

            if (updatedFavorite == null) {
                throw new FavoriteNotFoundException("Favorite city " + city + " not found");
            }

            return updatedFavorite;
        } catch (Exception e) {
            throw new DatabaseException("Unexpected database operation exception " + e.getMessage());
        }
    }
}
