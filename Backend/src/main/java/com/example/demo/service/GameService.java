package com.example.demo.service;

import com.example.demo.domain.Game;
import com.example.demo.domain.Player;
import com.example.demo.domain.Question;
import com.example.demo.domain.enums.GameState;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class GameService {

    private final QuestionLoader questionLoader;
    private final Map<String, Game> games = new HashMap<>();

    public GameService(QuestionLoader questionLoader) {
        this.questionLoader = questionLoader;
    }

    // Créer une partie
    public Game createGame() {
        String code = "";

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (int i = 0; i < 5; i++) {
            int index = (int) (Math.random() * characters.length());
            code += characters.charAt(index);
        }

        while (games.containsKey(code)) {
            code = "";
            for (int i = 0; i < 5; i++) {
                int index = (int) (Math.random() * characters.length());
                code += characters.charAt(index);
            }
        }

        Game game = new Game(code, questionLoader.getQuestions());
        games.put(code, game);

        return game;
    }

    // Retrouver une partie
    public Game getGame(String code) {
        Game game = games.get(code);

        if (game == null) {
            throw new IllegalArgumentException("Partie introuvable");
        }

        return game;
    }

    // Ajouter un joueur
    public Player joinGame(String code, String pseudo) {
        Game game = getGame(code);

        if (game.getGameState() != GameState.LOBBY) {
            throw new IllegalStateException("La partie a déjà commencé");
        }

        Player player = new Player(pseudo);
        game.addPlayer(player);

        return player;
    }

    // Lancer la question suivante
    public Question startNextQuestion(String code) {
        Game game = getGame(code);

        game.startNextQuestion();

        return game.getCurrentQuestion();
    }

    // Enregistrer une réponse
    public void submitAnswer(String code, UUID playerId, int choice) {
        Game game = getGame(code);
        game.submitAnswer(playerId, choice);
    }

    // Fermer une question
    public void closeQuestion(String code) {
        Game game = getGame(code);

        game.lockedQuestion();
        game.revealQuestion();
    }
}