package com.courzelo.lms.services;

import com.courzelo.lms.entities.DeviceMetadata;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.repositories.DeviceMetadataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceMetadataService implements IDeviceMetadataService{
    private final DeviceMetadataRepository deviceMetadataRepository;
    @Override
    public void saveDeviceDetails(String device, User user){
        log.info("Saving Device...");
        log.info("Device : "+device);
        DeviceMetadata deviceMetadata= new DeviceMetadata();
        deviceMetadata.setDeviceDetails(device);
        deviceMetadata.setUser(user);
        deviceMetadata.setLastLoggedIn(Instant.now());
        deviceMetadataRepository.save(deviceMetadata);
        log.info("Device Saved!");
    }

    @Override
    public boolean isNewDevice(String userAgent, User user) {
        log.info("Searching for Device...");
        List<DeviceMetadata> devices = deviceMetadataRepository.findByUser(user);
        for (DeviceMetadata device : devices) {
            if (device.getDeviceDetails().equals(userAgent)) {
                log.info("Device found!");
                return false;
            }
        }
        log.info("Device not found!");
        return true;
    }
}
