package com.example.demo.service;

import com.example.demo.domain.Question;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class QuestionLoader {
    private final List<Question> questions;

    public QuestionLoader(ObjectMapper objectMapper) throws IOException {
        try (InputStream in = new ClassPathResource("questions.json").getInputStream()) {
            this.questions = objectMapper.readValue(in , new TypeReference<List<Question>>(){});
    }
}

public List<Question> getQuestions() {
    return questions;
    }
}
