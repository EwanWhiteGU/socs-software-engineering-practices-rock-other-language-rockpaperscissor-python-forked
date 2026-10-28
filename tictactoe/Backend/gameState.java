package com.example.game;

public record GameState(
        String[] board,
        String status,
        String winner,
        int[] winningLine,
        String message
) {}