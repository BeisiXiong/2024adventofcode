import {join} from "path";
import {readFileSync} from "fs";

export function aoc07() {
    //use the Example input data below and use the Analyze the input data to run the code
    const inputPath = join(__dirname, '..', 'Inputs', 'aoc06.txt');
    const input = readFileSync(inputPath, 'utf-8');
    function translateMapToArray(map: string): string[] {
        return map.trim().split("\n").map(line => `"${line}"`);
    }

    const data = (translateMapToArray(input)); // Output: 7
    console.log(predictGuardPath(data)); // Output: 7
}

// Define the directions and their corresponding vectors
const directions = ['^', '>', 'v', '<'];
const deltas = [
    [-1, 0], // up
    [0, 1],  // right
    [1, 0],  // down
    [0, -1]  // left
];

function predictGuardPath(map: string[]): number {
    const rows = map.length;
    const cols = map[0].length;

    // Find the starting position and direction of the guard
    let guardRow = 0;
    let guardCol = 0;
    let directionIndex = 0; // Index in the directions array

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const char = map[r][c];
            if (directions.includes(char)) {
                guardRow = r;
                guardCol = c;
                directionIndex = directions.indexOf(char);
                break;
            }
        }
    }

    const visited = new Set<string>();

    while (true) {
        // Mark the current position as visited
        visited.add(`${guardRow},${guardCol}`);

        // Calculate the next position based on the current direction
        const [dr, dc] = deltas[directionIndex];
        const nextRow = guardRow + dr;
        const nextCol = guardCol + dc;

        // Check if the next position is out of bounds
        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
            break;
        }

        const nextCell = map[nextRow][nextCol];

        // If there is an obstacle (#), turn right
        if (nextCell === '#') {
            directionIndex = (directionIndex + 1) % 4;
        } else {
            // Otherwise, move to the next position
            guardRow = nextRow;
            guardCol = nextCol;
        }
    }

    return visited.size;
}



