package com.courzelo.lms.services;



import com.courzelo.lms.entities.Universite;
import com.courzelo.lms.repositories.Universiterepository;

import java.util.List;

public class UniversiteService implements IUniversiteService {
    private Universiterepository universiterepository ;


    @Override
    public List<Universite> getuniversities() {

        return universiterepository.findAll();
    }
}
