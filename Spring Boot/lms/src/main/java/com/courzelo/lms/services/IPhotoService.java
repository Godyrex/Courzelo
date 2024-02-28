package com.courzelo.lms.services;

import com.courzelo.lms.entities.Photo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPhotoService {
    Photo addPhoto(MultipartFile file) throws IOException;

    Photo getPhoto(String id);
}
