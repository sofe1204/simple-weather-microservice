package com.example.cityweather.Controller;

import com.example.cityweather.Model.CityData;
import com.example.cityweather.Service.CityDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@RequestMapping("/api/weather")

public class CityDataController {
    private final CityDataService cityDataService;

    public CityDataController(CityDataService cityDataService) {
        this.cityDataService = cityDataService;
    }

    @GetMapping("/{name}")
    public Mono<ResponseEntity<CityData>> getWeather(@PathVariable String name) {
        String apiKey = "68a75bbabc344c72ba2182952242202";

        return cityDataService.getData(name, apiKey)
                .map(weatherData -> ResponseEntity.ok(weatherData))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<CityData> searchWeather(@RequestParam("name") String name) {

        String apiKey = "68a75bbabc344c72ba2182952242202";
        CityData weatherData = cityDataService.getData(name, apiKey).block();

        if (weatherData != null) {
            return ResponseEntity.ok(weatherData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
