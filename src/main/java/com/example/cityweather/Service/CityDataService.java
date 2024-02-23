package com.example.cityweather.Service;

import com.example.cityweather.Model.CityData;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

public interface CityDataService {


    List<CityData> findAll();

    Optional<CityData> findById(Long id);

    Optional<CityData> findByName(String name);

    Mono<CityData> getData(String name, String apiKey);

}
