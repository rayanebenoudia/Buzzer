package com.example.demo.repository;

import com.example.demo.domain.Game;


import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class GameRepository {
    private final Map<String, Game> games = new ConcurrentHashMap<>();

    public void save(Game game) {
        games.put(game.getCode(), game);
    }
    public  Optional<Game> findByCode(String code ) {
        return Optional.ofNullable(games.get(code));

    }

    public boolean existsByCode(String code){
       return games.containsKey(code);
    }
}
