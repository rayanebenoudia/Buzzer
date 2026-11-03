package com.example.demo.controller;

import com.example.demo.service.GameService;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class GameSocketController {

    private final GameService gameService;
    private final SimpMessagingTemplate messagingTemplate;

    public GameSocketController(
            GameService gameService,
            SimpMessagingTemplate messagingTemplate) {

        this.gameService = gameService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/game/{code}/next")
    public void nextQuestion(@DestinationVariable String code) {

        var question = gameService.startNextQuestion(code);

        messagingTemplate.convertAndSend(
                "/topic/games/" + code,
                question
        );
    }
}