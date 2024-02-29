package com.courzelo.lms.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdatePhotoDTO {
    MultipartFile photo;
}
