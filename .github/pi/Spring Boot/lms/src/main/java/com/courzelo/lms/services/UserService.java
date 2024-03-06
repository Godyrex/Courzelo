package com.courzelo.lms.services;


import com.courzelo.lms.entities.Role;
import com.courzelo.lms.entities.Student;
import com.courzelo.lms.entities.User;
import com.courzelo.lms.repositories.StudentRepository;
import com.courzelo.lms.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    @Override
    public void saveUser(User user) {
    userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public void updateUser(User user) {
    userRepository.save(user);
    }

    @Override
    public User getUserByID(String userID) {
        return userRepository.findById(userID)
                .orElseThrow(()-> new RuntimeException("User Not Found!"));
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public void assignStudentToUser(String studentID, String userID) {
        User user = getUserByID(userID);
        Student student =studentRepository.findById(studentID)
                .orElseThrow();
            user.getRoles().add(Role.STUDENT);
            user.setRoleDetails(student);
            saveUser(user);

    }
}
