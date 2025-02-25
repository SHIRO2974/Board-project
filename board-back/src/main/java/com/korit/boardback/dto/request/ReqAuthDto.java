package com.korit.boardback.dto.request;

import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
public class ReqAuthDto {

    private String accessToken;
    private String refreshToken;
}
