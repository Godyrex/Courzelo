package com.courzelo.lms.services;




import com.courzelo.lms.entities.User;

import java.util.List;

public interface IUserService {
    void saveUser(User user);
    void deleteUser(User user);
    void updateUser (User user);
    User getUserByID(String userID);
    List<User> getUsers();
    void assignStudentToUser(String studentID,String userID);
}
