package com.korit.boardback.repository;

import com.korit.boardback.entity.User;
import com.korit.boardback.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepository {

    @Autowired
    private UserMapper userMapper;

    public Optional<User> findByUserId(int userId) {
        return Optional.ofNullable(userMapper.selectByUserId(userId));
    }

    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(userMapper.selectByUsername(username));
    }

    public User save(User user) {
        userMapper.insert(user);
        return user;
    }

    public void updateProfileImg(int userId, String profileImg) {

        userMapper.updateProfileById(userId, profileImg);
    }

    public void updateNickname(int userId, String nickname) {

        userMapper.updateNicknameById(userId, nickname);
    }

    public void updatePassword(int userId, String Password) {

        userMapper.updatePasswordById(userId, Password);
    }

    public void updateAccountEnabled(String username) {

        userMapper.updateAccountEnabledByUsername(username);
    }

    public void updateEmail(int userId, String email) {

        userMapper.updateEmailById(userId, email);
    }

}
