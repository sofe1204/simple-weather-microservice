package com.example.cityweather.Service.impl;

import com.example.cityweather.Model.CityData;
import com.example.cityweather.Repository.CityDataRepository;
import com.example.cityweather.Service.CityDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CityDataServiceImplementation implements CityDataService {
    private final CityDataRepository cityDataRepository;
    private final WebClient webClient;

    @Autowired
    public CityDataServiceImplementation(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.weatherapi.com/v1/").build();
        this.cityDataRepository = null;
    }

    public CityDataServiceImplementation(CityDataRepository cityDataRepository) {
        this.cityDataRepository = cityDataRepository;
        this.webClient = null;
    }
    public CityDataServiceImplementation(WebClient webClient) {
        this.webClient = webClient;
        this.cityDataRepository = null;
    }

    @Override
    public List<CityData> findAll() {
        return this.cityDataRepository.findAll();
    }
    @Override
    public Optional<CityData> findById(Long id) {
        return this.cityDataRepository.findById(id);
    }
    @Override
    public Optional<CityData> findByName(String name) {
        return this.cityDataRepository.findByName(name);
    }

//    @Override
//    public Mono<CityData> getData(String name, String apiKey) {
//        return webClient.get()
//                .uri("/current.json?q={city}&key={apiKey}", name, apiKey)
//                .retrieve()
//                .bodyToMono(CityData.class);
//    }
@Override
public Mono<CityData> getData(String name, String apiKey) {
    return webClient.get()
            .uri("/current.json?q={city}&key={apiKey}", name, apiKey)
            .retrieve()
            .bodyToMono(Map.class)
            .map(responseMap -> {

                if (responseMap.containsKey("location") && responseMap.containsKey("current")) {
                    Map locationMap = (Map) responseMap.get("location");
                    Map currentMap = (Map) responseMap.get("current");


                    CityData cityData = new CityData();
                    cityData.setName((String) locationMap.get("name"));
                    cityData.setTemp(((Number) currentMap.get("temp_c")).doubleValue());
                    if (currentMap.containsKey("condition")) {
                        Map conditionMap = (Map) currentMap.get("condition");
                        cityData.setCondition((String) conditionMap.get("text"));
                    }
                    cityData.setWind_speed(((Number) currentMap.get("wind_kph")).doubleValue());
                    cityData.setWind_direction((String) currentMap.get("wind_dir"));


                    return cityData;
                } else {
                    throw new RuntimeException("Unexpected response format");
                }
            });
        }
}
