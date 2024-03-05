package com.courzelo.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class DeviceListDTO {
    List<DeviceDTO> devices;
    int totalPages;
}
