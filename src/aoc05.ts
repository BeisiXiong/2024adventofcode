import {join} from "path";
import {readFileSync} from "fs";

export function aoc05() {
    //use the Example input data below and use the Analyze the input data to run the code
    const inputPath = join(__dirname, '..', 'Inputs', 'aoc05.txt');

    const input = readFileSync(inputPath, 'utf-8');

    console.log(processUpdates(input)); // Output: 4766
// Example input
/*const input = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;*/

//console.log(processUpdates(input)); // Output: 143

}


// Helper function to parse the input data
function parseInput(input: string) {
    const [rulesPart, updatesPart] = input.trim().split("\n\n");
    const rules = rulesPart.split("\n").map(line => line.split("|").map(Number));
    const updates = updatesPart.split("\n").map(line => line.split(",").map(Number));
    return { rules, updates };
}

// Function to check if an update is in the correct order
function isUpdateValid(update: number[], rules: number[][]): boolean {
    for (const [x, y] of rules) {
        const indexX = update.indexOf(x);
        const indexY = update.indexOf(y);
        // If both pages are in the update, ensure X comes before Y
        if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
            return false;
        }
    }
    return true;
}

// Function to calculate the middle page number of an update
function getMiddlePage(update: number[]): number {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
}

// Main function to process the task
function processUpdates(input: string): number {
    const { rules, updates } = parseInput(input);
    let middlePageSum = 0;

    for (const update of updates) {
        if (isUpdateValid(update, rules)) {
            middlePageSum += getMiddlePage(update);
        }
    }

    return middlePageSum;
}


