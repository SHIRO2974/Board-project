package com.korit.boardback.service;

import com.korit.boardback.Jwt.JwtUtil;
import com.korit.boardback.dto.request.ReqJoinDto;
import com.korit.boardback.dto.request.ReqLoginDto;
import com.korit.boardback.entity.User;
import com.korit.boardback.exception.DuplicatedValueException;
import com.korit.boardback.exception.FieldError;
import com.korit.boardback.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    public boolean duplicatedByUsername(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Transactional(rollbackFor = Exception.class)
    public User join(ReqJoinDto reqJoinDto) {
        if(duplicatedByUsername(reqJoinDto.getUsername())) {
            throw new DuplicatedValueException(List.of(FieldError.builder()
                            .field("username")
                            .message("이미 존재하는 사용자이름입니다.")
                            .build()));
        }
        User user = User.builder()
                .username(reqJoinDto.getUsername())
                .password(passwordEncoder.encode(reqJoinDto.getPassword()))
                .email(reqJoinDto.getEmail())
                .nickname(reqJoinDto.getUsername())
                .accountExpired(1)
                .accountLocked(1)
                .credentialsExpired(1)
                .accountEnabled(1)
                .build();
        return userRepository.save(user);
    }
    public String login(ReqLoginDto reqLoginDto) {

        User user = userRepository.findByUsername(reqLoginDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("사용자 정보를 다시 확인하세요."));

        if (!passwordEncoder.matches(reqLoginDto.getPassword(), user.getPassword())) {

            throw new BadCredentialsException("사용자 정보를 다시 확인하세요");
        }

        Date expires = new Date(new Date().getTime() + (1000l * 60 * 60 * 24 * 7));

        return jwtUtil.generateToken(user.getUsername(), Integer.toString(user.getUserId()), expires);

    }



}
