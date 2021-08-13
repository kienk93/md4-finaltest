package com.example.finalmd4.repository;

import com.example.finalmd4.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<City,Long> {
    Iterable<City> findByNameContaining(String name);
}
