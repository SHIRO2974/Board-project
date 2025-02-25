package com.korit.boardback.Jwt;

import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {

    private Key key;
    private long accessTokenExpire;
    private long refreshTokenExpire;
}
