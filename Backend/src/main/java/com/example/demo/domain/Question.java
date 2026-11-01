package com.example.demo.domain;

import java.util.List;

public record Question(String text, List<String> answers, int durationSeconds, int id, int answerPosition) {
}
