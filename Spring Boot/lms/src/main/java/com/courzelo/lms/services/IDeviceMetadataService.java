package com.courzelo.lms.services;

import com.courzelo.lms.entities.User;

public interface IDeviceMetadataService {
    void saveDeviceDetails(String userAgent, User user);
    boolean isNewDevice(String userAgent, User user);
}
