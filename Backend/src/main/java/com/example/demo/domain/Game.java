package com.example.demo.domain;

import com.example.demo.domain.enums.GameState;
import com.example.demo.domain.enums.QuestionState;

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
    private int currentQuestionIndex;
    private Instant questionStartedAt;


    public Game(String code , List<Question> questions){
        this.code = code;
        this.gameState = GameState.LOBBY;
        this.questions = questions;
        this.currentQuestionIndex = -1;


    }

    public void addPlayer(Player player) {
        players.put(player.getId(), player);
    }

    public GameState getGameState() {

        return gameState;
    }

    public Instant getQuestionStartedAt() {

        return questionStartedAt;
    }

    public String getCode() {
        return code;
    }

    public QuestionState getQuestionState(){
        return questionState;
    }

    public void startNextQuestion(){

        if (currentQuestionIndex + 1 >= questions.size()){
            throw new IllegalStateException("No more question");
        }

        gameState = GameState.IN_PROGRESS;
        currentQuestionIndex++;
        questionStartedAt = Instant.now();
        questionState= QuestionState.OPEN;
        answers.clear();

    }

    public void lockedQuestion(){
        if ( questionState != QuestionState.OPEN) {
             throw new IllegalStateException( "Question is not open");
        }
        questionState = QuestionState.LOCKED;
    }

    public void submitAnswer( UUID playerId, int choiceIndex) {
        if (questionState != QuestionState.OPEN) {
            throw new IllegalStateException("question is not open");
        }
        if (!players.containsKey(playerId)) {
            throw new IllegalStateException("player doesn't exist");
        }
        if (answers.containsKey(playerId)) {
            throw new IllegalStateException("already answered");
        }
        if (choiceIndex < 0 || choiceIndex >= questions.get(currentQuestionIndex).answers().size()){
            throw new IllegalArgumentException(" Invalid answer");
        }

       answers.put( playerId, choiceIndex) ;

        }
    public void revealQuestion(){
        if ( questionState != QuestionState.LOCKED) {
            throw new IllegalStateException("Question is not locked");
        }
        questionState = QuestionState.REVEALED;
    }

    public void finishGame() {

        if (gameState != GameState.IN_PROGRESS){
            throw new IllegalStateException("Game is not in progress");
        }
        if (questionState != QuestionState.REVEALED){
            throw new IllegalStateException("question is not revealed");

        }
        gameState = GameState.FINISHED;

    }

  public boolean hasAnswered( UUID playerId){
        return answers.containsKey(playerId);

  }

    public Question getCurrentQuestion() {
        if(currentQuestionIndex < 0){
            throw new IllegalStateException("No question selected yet");
        }
        return questions.get(currentQuestionIndex);
    }
}


