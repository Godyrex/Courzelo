package com.courzelo.lms.dto.user;

import lombok.Data;

@Data
public class DeviceResDTO {
    Boolean deviceIsNew;

    public DeviceResDTO(Boolean deviceIsNew) {
        this.deviceIsNew = deviceIsNew;
    }
}
