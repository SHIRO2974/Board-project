package com.korit.boardback.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${user.dir}")
    private String rootPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // image 요청이 들어오면 upload 경로에서 파일을 찾도록 설정
        registry.addResourceHandler("/image/**")
                .addResourceLocations("file:" + rootPath + "/upload/")
                .resourceChain(true)    // 리소스 정보를 연결
                .addResolver(new PathResourceResolver() {

                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {

                        // 리소스 경로가 URL 인코딩되어 있을 수 있기 때문에 디코딩
                        resourcePath = URLDecoder.decode(resourcePath, StandardCharsets.UTF_8);

                        return super.getResource(resourcePath, location);
                    }
                });
    }
}
