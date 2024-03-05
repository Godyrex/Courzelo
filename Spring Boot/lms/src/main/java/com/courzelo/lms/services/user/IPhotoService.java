package com.courzelo.lms.services.user;

import com.courzelo.lms.entities.user.Photo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPhotoService {
    Photo addPhoto(MultipartFile file) throws IOException;

    ResponseEntity<byte[]> getPhoto(String photoId);
}
