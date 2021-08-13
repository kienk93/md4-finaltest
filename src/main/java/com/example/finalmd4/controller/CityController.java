package com.example.finalmd4.controller;

import com.example.finalmd4.model.City;
import com.example.finalmd4.service.city.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin("*")
@RestController
@RequestMapping("/cities")
public class CityController {
    @Autowired
    ICityService cityService;
    @GetMapping
    public ResponseEntity<Iterable<City>> getListCity(){
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<City> createCity(@RequestBody City city){
        return new ResponseEntity<>(cityService.save(city),HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<City> findById(@PathVariable Long id){
        Optional<City> cityOptional = cityService.findById(id);
        if(!cityOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(cityOptional.get(),HttpStatus.OK);

    }
    @PutMapping("/{id}")
    public ResponseEntity<City> editCity(@PathVariable Long id,@RequestBody City city){
        Optional<City> cityOptional = cityService.findById(id);
        if(!cityOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        cityService.save(city);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<City> deleteCity(@PathVariable Long id){
        Optional<City> cityOptional = cityService.findById(id);
        if(!cityOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        cityService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<Iterable<City>> findByName(@RequestParam String name){
        return new ResponseEntity<>(cityService.findByNameContaining(name),HttpStatus.OK);

    }
}
