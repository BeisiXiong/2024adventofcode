import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export function aoc01() {
    //find the path to the input file, which is in the 2024adventofcode and then Inputs

    const inputPath = join(__dirname, '..', 'Inputs', 'aoc01.txt');

    function parseInput(input: string): [number[], number[]] {
        const lines = input.trim().split('\n');
        const left: number[] = [];
        const right: number[] = [];

        lines.forEach(line => {
            const [leftNum, rightNum] = line.split(/\s+/).map(Number);
            left.push(leftNum);
            right.push(rightNum);
        });

        return [left, right];
    }
    const input = readFileSync(inputPath, 'utf-8');
    const [left, right] = parseInput(input);
    console.log('Parsed left:', left);
    console.log('Parsed right:', right);
    const totalDistance = sumDistances(left, right);
    console.log(`Total Distance: ${totalDistance}`);
}

function sortListAscending(numbers: number[]): number[] {
    return numbers.sort((a, b) => a - b);
}


function sortTwoLists(left: number[], right: number[]): { sortedLeft: number[], sortedRight: number[] } {
    const sortedLeft = sortListAscending(left);
    const sortedRight = sortListAscending(right);
    return { sortedLeft, sortedRight };
}

function calculateDistances(left: number[], right: number[]): number[] {
    const { sortedLeft, sortedRight } = sortTwoLists(left, right);
    const distances: number[] = [];
    for (let i = 0; i < left.length; i++) {
        distances.push(Math.abs(sortedLeft[i] - sortedRight[i]));
       // totalDistance += Math.abs(left[i] - right[i]);
    }
    return distances;
}

function sumDistances(left: number[], right: number[]): number {
    const distances = calculateDistances(left, right);
    return distances.reduce((sum, distance) => sum + distance, 0);
}





