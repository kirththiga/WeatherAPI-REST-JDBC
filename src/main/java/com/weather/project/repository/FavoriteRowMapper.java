package com.weather.project.repository;

import com.weather.project.model.Favorite;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FavoriteRowMapper implements RowMapper<Favorite> {

    @Override
    public Favorite mapRow(ResultSet rs, int rowNum) throws SQLException {

        return Favorite.builder()
                .id(rs.getInt("id"))
                .name(rs.getString("name"))
                .region(rs.getString("region"))
                .country(rs.getString("country"))
                .visited(rs.getBoolean("visited"))
                .label(rs.getString("label"))
                .ranking(rs.getInt("ranking"))
                .build();
    }
}
