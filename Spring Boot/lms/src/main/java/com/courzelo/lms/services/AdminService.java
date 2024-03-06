package com.courzelo.lms.services;


import com.courzelo.lms.entities.Admin;
import com.courzelo.lms.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AdminService implements IAdminService {
    private  final AdminRepository adminRepository;
    @Override
    public void saveAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    @Override
    public void deleteAdmin(Admin admin) {
        adminRepository.delete(admin);
    }

    @Override
    public void updateAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    @Override
    public Admin getAdminByID(String adminID) {
        return adminRepository.findById(adminID).orElseThrow(()-> new RuntimeException("Admin Not Found!"));
    }

    @Override
    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }
}
