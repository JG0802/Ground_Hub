package com.ce.gh_back.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class FileService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<Map<String, Object>> readJsonFile(String filename) {
        try {
            File file = new File(filename);

            // 파일이 존재하지 않으면 생성
            if (!file.exists()) {
                objectMapper.writerWithDefaultPrettyPrinter().writeValue(file, Collections.emptyList());
            }

            return objectMapper.readValue(file, new TypeReference<>() {});
        } catch (IOException e) {
            throw new RuntimeException("JSON 파일 읽기 실패: " + filename, e);
        }
    }

    public void writeJsonFile(String filename, List<Map<String, Object>> data) {
        try {
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File(filename), data);
        } catch (IOException e) {
            throw new RuntimeException("JSON 파일 쓰기 실패: " + filename, e);
        }
    }
}