import { join } from "path";
import { readFileSync } from "fs";

export function aoc07() {
    const inputPath = join(__dirname, '..', 'Inputs', 'aoc07.txt');
    const input = readFileSync(inputPath, 'utf-8').trim().split('\n');
    const result = calculateCalibrationResult(input);
    console.log(`Total Calibration Result: ${result}`);
}

// Function to evaluate an expression left-to-right without operator precedence
function evaluateExpression(numbers: number[], operators: string[]): number {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        if (operator === '+') {
            result += numbers[i + 1];
        } else if (operator === '*') {
            result *= numbers[i + 1];
        }
    }
    return result;
}

// Function to generate all possible combinations of operators for a given number of gaps
function generateOperatorCombinations(gaps: number): string[][] {
    const operators = ['+', '*'];
    const combinations: string[][] = [];

    function backtrack(current: string[], depth: number) {
        if (depth === gaps) {
            combinations.push([...current]);
            return;
        }
        for (const operator of operators) {
            current.push(operator);
            backtrack(current, depth + 1);
            current.pop();
        }
    }

    backtrack([], 0);
    return combinations;
}

// Main function to calculate the total calibration result
function calculateCalibrationResult(input: string[]): number {
    let totalCalibrationResult = 0;

    for (const line of input) {
        const [testValueStr, numbersStr] = line.split(': ');
        const testValue = parseInt(testValueStr, 10);
        const numbers = numbersStr.split(' ').map(Number);

        const gaps = numbers.length - 1; // Number of gaps between numbers
        const operatorCombinations = generateOperatorCombinations(gaps);

        let validEquationFound = false;

        for (const operators of operatorCombinations) {
            const result = evaluateExpression(numbers, operators);
            if (result === testValue) {
                validEquationFound = true;
                break;
            }
        }

        if (validEquationFound) {
            totalCalibrationResult += testValue;
        }
    }

    return totalCalibrationResult;
}