package com.korit.boardback.mapper;

import com.korit.boardback.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    User selectByUsername(String username);
    User selectByEmail(String email);
    int insert(User user);
    User selectByUserId(int userId);
    int updateProfileById(
            @Param("userId")int userId,
            @Param("profileImg") String profileImg);
    int updateNicknameById(
            @Param("userId") int userId,
            @Param("nickname") String nickname);
    int updatePasswordById(
            @Param("userId") int userId,
            @Param("password") String password);
    int updateAccountEnabledByUsername(
            @Param("email") String username
    );
    int updateEmailById(
            @Param("userid") int userId,
            @Param("email") String email
    );
}
