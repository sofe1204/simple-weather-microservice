package com.example.cityweather.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class CityData {
    @Id
    private String name;
    private Double temp;
    private String condition;
    private Double wind_speed;
    private String wind_direction;

    public CityData(){}

    public CityData(String name, Double temp, String condition, Double wind_speed, String wind_direction) {
        this.name = name;
        this.temp = temp;
        this.condition = condition;
        this.wind_speed = wind_speed;
        this.wind_direction = wind_direction;
    }
}