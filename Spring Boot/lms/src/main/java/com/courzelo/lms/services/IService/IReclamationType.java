package com.courzelo.lms.services.IService;

import com.courzelo.lms.entities.reclamation.ReclamationType;

import java.util.Optional;

public interface IReclamationType {
    ReclamationType findByType(String type);

}
