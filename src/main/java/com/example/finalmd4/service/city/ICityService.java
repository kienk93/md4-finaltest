package com.example.finalmd4.service.city;

import com.example.finalmd4.model.City;
import com.example.finalmd4.service.IGeneralService;

public interface ICityService extends IGeneralService<City> {
    Iterable<City> findByNameContaining(String name);
}
