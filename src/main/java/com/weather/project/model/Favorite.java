package com.weather.project.model;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {
    private int id;
    private String name;
    private String region;
    private String country;
    private boolean visited;
    private String label;
    private int ranking;
}
