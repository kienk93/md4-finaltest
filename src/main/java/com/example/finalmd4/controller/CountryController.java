package com.example.finalmd4.controller;

import com.example.finalmd4.model.Country;
import com.example.finalmd4.service.country.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin("*")
@RestController
@RequestMapping("/countries")
public class CountryController {
    @Autowired
    ICountryService countryService;
    @GetMapping
    public ResponseEntity<Iterable<Country>> getListCountry(){
        return new ResponseEntity<>(countryService.findAll(), HttpStatus.OK);
    }
}
