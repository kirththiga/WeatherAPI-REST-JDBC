package com.weather.project.adapter;

import com.weather.project.model.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.text.MessageFormat;
import java.util.Map;

@Component
public class WeatherAdapter {

    @Value("${api.weather.url}")
    private String apiUrl;
    @Value("${api.weather.api_key}")
    private String apiKey ;

    private final RestTemplate restTemplate;

    @Autowired
    public WeatherAdapter(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Favorite getWeatherByCity(String city) {
        String weatherApiUrl = apiUrl.concat("/current.json?key={0}&q={1}");
        String url = MessageFormat.format(weatherApiUrl, apiKey, city);

        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        Map<String, Object> location = (Map<String, Object>) response.get("location");

        Favorite favorite = new Favorite();
        favorite.setName((String) location.get("name"));
        favorite.setRegion((String) location.get("region"));
        favorite.setCountry((String) location.get("country"));

        return favorite;
    }
}
