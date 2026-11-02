
package com.example.demo.controller;

import com.example.demo.domain.Game;
import com.example.demo.domain.Player;
import com.example.demo.service.GameService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/games")
public class GameRestController {

    private final GameService gameService;

    public GameRestController(GameService gameService) {
        this.gameService = gameService;
    }

    // Créer une partie
    @PostMapping
    public Game createGame() {
        return gameService.createGame();
    }

    // Rejoindre une partie
    @PostMapping("/{code}/players")
    public Player joinGame(
            @PathVariable String code,
            @RequestParam String pseudo) {

        return gameService.joinGame(code, pseudo);
    }

    // Récupérer une partie
    @GetMapping("/{code}")
    public Game getGame(@PathVariable String code) {
        return gameService.getGame(code);
    }
}
