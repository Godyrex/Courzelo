package com.courzelo.lms.dto;

import lombok.Data;

@Data
public class DeviceDTO {
    Boolean deviceIsNew;

    public DeviceDTO(Boolean deviceIsNew) {
        this.deviceIsNew = deviceIsNew;
    }
}
