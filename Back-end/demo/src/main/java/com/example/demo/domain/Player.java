package main.java.com.example.demo.domain;

import java.util.UUID;

public class Player {

    private final UUID id;
    private final String pseudo;
    private int score;

    public Player(String pseudo){
        this.pseudo = pseudo;
        this.id = UUID.randomUUID();
        this.score = 0;
    }

    public String getPseudo(){
        return pseudo ;
    }

    public UUID getId(){
        return id ;
    }

    public int getScore(){
        return score;

    }

    public void addScore(int addedScore) {
        this.score += addedScore;
    }
}

