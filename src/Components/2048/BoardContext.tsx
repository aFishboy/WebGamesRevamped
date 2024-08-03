import React, { useState, useEffect, useCallback } from "react";

const BOARD_SIZE = 4;
let CURR_ID = 0;

interface BoardSlots {
    id: number;
    value: number;
}

export function addNewTile(boardSlot: BoardSlots[][]) {
    const emptyTiles = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (boardSlot[row][col].value === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }
    if (emptyTiles.length === 0) return;
    const { row, col } =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    boardSlot[row][col].value = Math.random() < 0.9 ? 2 : 4;
}

export function initializeBoard(): BoardSlots[][] {
    const newBoard: BoardSlots[][] = Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => ({
            id: CURR_ID++,
            value: 0,
        }))
    );
    addNewTile(newBoard);
    addNewTile(newBoard);
    return newBoard;
}

function slideTiles(boardSlot: BoardSlots[][]): BoardSlots[][] {
    return boardSlot.map((row) => {
        const filteredRow = row.filter((cell) => cell.value !== 0);
        const mergedRow = [];
        let skip = false;
        for (let i = 0; i < filteredRow.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (
                i < filteredRow.length - 1 &&
                filteredRow[i].value === filteredRow[i + 1].value
            ) {
                mergedRow.push({
                    id: filteredRow[i].id,
                    value: filteredRow[i].value * 2,
                });
                skip = true;
            } else {
                mergedRow.push(filteredRow[i]);
            }
        }
        while (mergedRow.length < BOARD_SIZE) {
            mergedRow.push({ id: CURR_ID++, value: 0 });
        }
        return mergedRow;
    });
}

export function handleArrowUp(board: BoardSlots[][]): BoardSlots[][] {
    board = transpose(board);
    board = slideTiles(board);
    return transpose(board);
}

export function handleArrowDown(board: BoardSlots[][]): BoardSlots[][] {
    board = transpose(board);
    board = flipHorizontally(board);
    board = slideTiles(board);
    board = flipHorizontally(board);
    return transpose(board);
}

export function handleArrowLeft(board: BoardSlots[][]): BoardSlots[][] {
    return slideTiles(board);
}

export function handleArrowRight(board: BoardSlots[][]): BoardSlots[][] {
    board = flipHorizontally(board);
    board = slideTiles(board);
    return flipHorizontally(board);
}

function transpose(board: BoardSlots[][]): BoardSlots[][] {
    return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

const flipHorizontally = (board: BoardSlots[][]): BoardSlots[][] => {
    return board.map((row) => [...row].reverse());
};
