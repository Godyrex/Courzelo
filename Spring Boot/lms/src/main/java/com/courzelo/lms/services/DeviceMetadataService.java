package com.courzelo.lms.services;

import com.courzelo.lms.entities.DeviceMetadata;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.repositories.DeviceMetadataRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeviceMetadataService implements IDeviceMetadataService{
    private final DeviceMetadataRepository deviceMetadataRepository;
    @Override
    public void getDeviceDetails(String device, User user){
        device=String.valueOf(device);
        System.out.println(device);
        DeviceMetadata deviceMetadata= new DeviceMetadata();
        deviceMetadata.setDeviceDetails(device);
        deviceMetadata.setUser(user);
        deviceMetadata.setLastLoggedIn(Instant.now());
        deviceMetadataRepository.save(deviceMetadata);
    }

    @Override
    public boolean isNewDevice(String userAgent, User user) {
        List<DeviceMetadata> devices = deviceMetadataRepository.findByUser(user);

        for (DeviceMetadata device : devices) {
            if (device.getDeviceDetails().equals(userAgent)) {
                return false;
            }
        }
        return true;
    }
}
