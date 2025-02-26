package com.korit.boardback.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@Service
public class FileService {

    @Value("${user.dir}")
    private String rootPath;

    public String saveFile(String path, MultipartFile file) {

        if (file.isEmpty()) {

            return null;
        }
        String newFileName = null;

        try {
            String originalFilename = file.getOriginalFilename();
            newFileName = UUID.randomUUID().toString().replaceAll("-", "") + "_" + originalFilename; // UUID: 네트워크상에서 중복되지 않는 고유한 식별자를 생성할 수 있다

            File newFilePath = new File(rootPath + "/" + path);
            if (!newFilePath.exists()) {    // 경로가 존재하지 않는다면

                newFilePath.mkdirs();   // 새로 만든다
            }
            File newFile = new File(rootPath + "/" + path + "/" + newFileName);
            file.transferTo(newFile);

        } catch (Exception e) {

            e.printStackTrace();
        }
        return newFileName;
    }

    public void deleteFile(String path) {

        File file = new File(rootPath + "/" + path);

        if (file.exists()) {    // 경로에 파일이 있다면

            file.delete();  // 파일 삭제
        }
    }
}
