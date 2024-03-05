package com.courzelo.lms.services;

import com.courzelo.lms.dto.DeviceDTO;
import com.courzelo.lms.dto.DeviceListDTO;
import com.courzelo.lms.entities.DeviceMetadata;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.exceptions.DeviceNotFoundException;
import com.courzelo.lms.repositories.DeviceMetadataRepository;
import com.courzelo.lms.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.List;

import static java.util.Arrays.stream;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeviceMetadataService implements IDeviceMetadataService {
    private final DeviceMetadataRepository deviceMetadataRepository;
    private final UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveDeviceDetails(String device, User user) {
        log.info("Saving Device...");
        log.info("Device : " + device);
        DeviceMetadata deviceMetadata = new DeviceMetadata();
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

    @Override
    public ResponseEntity<HttpStatus> deleteDevice(String id) {
        log.info("Deleting Device...");
        try {
            DeviceMetadata deviceMetadata = deviceMetadataRepository.findById(id)
                    .orElseThrow(() -> new DeviceNotFoundException("Device not found"));

            deviceMetadataRepository.delete(deviceMetadata);
            log.info("Device deleted!");
            return ResponseEntity.ok().build();
        } catch (DeviceNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<DeviceListDTO> getDevices(int page, int sizePerPage, Principal principal) {
        log.info("Getting Devices ...");
        try {
            if (page < 0 || sizePerPage <= 0) {
                return ResponseEntity.badRequest().build();
            }

            Pageable pageable = PageRequest.of(page, sizePerPage);

            User user = userRepository.findUserByEmail(principal.getName());
            List<DeviceDTO> deviceDTOS = deviceMetadataRepository.findByUser(user,pageable)
                    .stream()
                    .map(device -> modelMapper.map(device, DeviceDTO.class))
                    .toList();
            long totalItems = deviceMetadataRepository.countByUser(user);
            log.info("Total devices: {}", totalItems);

            int totalPages = (int) Math.ceil((double) totalItems / sizePerPage);
            log.info("Total pages: {}", totalPages);
            log.info("Devices in page {}: {}", page, deviceDTOS);
            DeviceListDTO deviceListDTO = new DeviceListDTO(deviceDTOS, totalPages);

            return ResponseEntity.ok().body(deviceListDTO);
        } catch (Exception e) {
            log.error("Error retrieving users: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}