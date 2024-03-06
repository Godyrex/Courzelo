package com.courzelo.lms.services;


import com.courzelo.lms.entities.Admin;

import java.util.List;

public interface IAdminService {
    void saveAdmin(Admin admin);
    void deleteAdmin(Admin admin);
    void updateAdmin (Admin admin);
    Admin getAdminByID(String adminID);
    List<Admin> getAdmins();
}
