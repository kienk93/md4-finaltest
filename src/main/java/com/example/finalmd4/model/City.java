package com.example.finalmd4.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    @ManyToOne
    Country country;
    @NotNull @Min(1)
    String area;

    @NotNull @Min(1)
    String population;

    @NotNull @Min(1)
    String GDP;

    String description;




}
