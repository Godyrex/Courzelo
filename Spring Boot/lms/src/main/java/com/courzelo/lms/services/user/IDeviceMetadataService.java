package com.courzelo.lms.services.user;

import com.courzelo.lms.dto.user.DeviceListDTO;
import com.courzelo.lms.entities.user.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface IDeviceMetadataService {
    void saveDeviceDetails(String userAgent, User user);
    void updateDeviceLastLogin(String userAgent, User user);

    boolean isNewDevice(String userAgent, User user);
    String getIpAddressFromHeader(HttpServletRequest request);

        ResponseEntity<HttpStatus> deleteDevice(String id);

    ResponseEntity<DeviceListDTO> getDevices(int page, int sizePerPage, Principal principal);
}
