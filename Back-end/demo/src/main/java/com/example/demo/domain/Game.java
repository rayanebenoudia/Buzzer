package main.java.com.example.demo.domain;

import main.java.com.example.demo.domain.enums.GameState;
import main.java.com.example.demo.domain.enums.QuestionState;

import javax.swing.plaf.nimbus.State;
import java.awt.*;
import java.time.Instant;
import java.util.*;
import java.util.List;

public class Game {
    private final String code;
    private GameState gameState;
    private final Map<UUID,Player> players = new HashMap<>();
    private final List<Question> questions;
    private QuestionState questionState;
    private final Map<UUID,Integer> answers = new HashMap<>();
    private Integer currentQuestionIndex;
    private Instant questionStartedAt;


    public Game(String code , List<Question> questions){
        this.code = code;
        this.gameState = GameState.LOBBY;
        this.questions = questions;



    }
}
