package com.courzelo.lms.services;

import com.courzelo.lms.entities.Photo;
import com.courzelo.lms.exceptions.PhotoNotFoundException;
import com.courzelo.lms.repositories.PhotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class PhotoService implements IPhotoService{
    private final PhotoRepository photoRepository;
    @Override
    public Photo addPhoto(MultipartFile file) throws IOException {
        log.info("Starting Adding Photo");
        Photo photo = new Photo("title");
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        log.info("Finished Adding Photo");
        return photoRepository.save(photo);
    }

    @Override
    public Photo getPhoto(String id) {
        return photoRepository.findById(id).orElseThrow(()-> new PhotoNotFoundException("Photo Not Found!"));     }
}
