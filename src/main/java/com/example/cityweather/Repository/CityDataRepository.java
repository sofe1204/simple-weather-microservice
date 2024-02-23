package com.example.cityweather.Repository;

import com.example.cityweather.Model.CityData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityDataRepository extends JpaRepository<CityData,Long> {
    Optional<CityData> findByName(String name);
}
