package com.courzelo.lms.dto.user;

import lombok.Data;

import java.time.Instant;

@Data
public class DeviceDTO {
    String id;
    String deviceDetails;
    Instant lastLoggedIn;
}
