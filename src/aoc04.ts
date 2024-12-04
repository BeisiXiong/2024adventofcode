import {join} from "path";
import {readFileSync} from "fs";

export function aoc04() {
    //use the Example input data below and use the Analyze the input data to run the code
    const inputPath = join(__dirname, '..', 'Inputs', 'aoc04.txt');

    function fileToGrid(filePath: string): Grid {
        const input = readFileSync(filePath, 'utf-8');
        const lines = input.trim().split('\n');
        const grid = lines.map(line => line.split(''));
        return grid;
    }

    const grid = fileToGrid(inputPath);
    const word = "XMAS";
    const result = countWordOccurrences(grid, word);
    console.log(result);
}

type Grid = string[][];

function countWordOccurrences(grid: Grid, word: string): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    let count = 0;

    // Directions: [rowOffset, colOffset]
    const directions = [
        [0, 1],   // Horizontal right
        [1, 0],   // Vertical down
        [1, 1],   // Diagonal down-right
        [1, -1],  // Diagonal down-left
        [0, -1],  // Horizontal left
        [-1, 0],  // Vertical up
        [-1, -1], // Diagonal up-left
        [-1, 1]   // Diagonal up-right
    ];

    // Helper to check if a word exists in a given direction
    function isWordAt(row: number, col: number, direction: [number, number]): boolean {
        let [rowOffset, colOffset] = direction;
        for (let i = 0; i < wordLength; i++) {
            const newRow = row + i * rowOffset;
            const newCol = col + i * colOffset;

            if (
                newRow < 0 || newRow >= rows || // Out of grid bounds (row)
                newCol < 0 || newCol >= cols || // Out of grid bounds (column)
                grid[newRow][newCol] !== word[i] // Character mismatch
            ) {
                return false;
            }
        }
        return true;
    }

    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Check all directions from the current cell
            for (const direction of directions as [number, number][]) {
                if (!isWordAt(row, col, direction)) {
                    continue;
                }
                count++;
            }
        }
    }

    return count;
}


