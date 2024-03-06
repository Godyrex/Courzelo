package com.courzelo.lms.services.IService;


import com.courzelo.lms.entities.Universite;

import java.util.List;

public interface  IUniversiteService {

   Universite saveUniversite(Universite u);
   void deleteUniversite(String u);
   Universite updateUniversite (Universite u);
   Universite getUniversiteByID(String uId);
   List<Universite> getUniversite();

}
