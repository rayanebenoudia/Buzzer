package main.java.com.example.demo.dto;

import java.util.List;

public record QuestionDto(String text, List<String> answers, int durationSeconds, int remainingTime , int id ) {
}
