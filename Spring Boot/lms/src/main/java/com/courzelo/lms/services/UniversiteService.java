package com.courzelo.lms.services;



import com.courzelo.lms.entities.Universite;
import com.courzelo.lms.repositories.Universiterepository;
import com.courzelo.lms.services.IService.IUniversiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversiteService implements IUniversiteService {
    @Autowired
    private Universiterepository universiterepository ;




    @Override
    public Universite saveUniversite(Universite u) {
        return universiterepository.save(u);
    }

    @Override
    public void deleteUniversite(String u) {

        universiterepository.deleteById(u);

    }

    @Override
    public Universite updateUniversite(Universite u) {
        return universiterepository.save(u);
    }

    @Override
    public Universite getUniversiteByID(String uId) {
        return universiterepository.findById(uId).get();
    }

    @Override
    public List<Universite> getUniversite() {
        return universiterepository.findAll();
    }
}
