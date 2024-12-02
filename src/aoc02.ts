import { readFileSync } from 'fs';
import { join } from 'path';


export function aoc2() {
    //use the Example input data below and use the Analyze the input data to run the code
    const inputPath = join(__dirname, '..', 'Inputs', 'aoc02.txt');

    function processFileToArray(inputPath: string): string[][] {
        const input = readFileSync(inputPath, 'utf-8');
        const lines = input.trim().split('\n');
        const result: string[][] = lines.map(line => line.split(/\s+/));
        return result;
    }

    const processedNumbers = processFileToArray(inputPath);
   // console.log(processedNumbers);

    // Analyze the input data
    const safeReportCount = countSafeReports(processedNumbers);
    console.log(`Number of safe reports: ${safeReportCount}`);
}

// Function to check if a report is safe
function isSafeReport(report: number[]): boolean {
    const differences = report.map((_, i, arr) => (i > 0 ? arr[i] - arr[i - 1] : 0)).slice(1);

    // Check if all differences are either positive or negative (strictly increasing or decreasing)
    const isIncreasing = differences.every(diff => diff > 0);
    const isDecreasing = differences.every(diff => diff < 0);

    // Check if all differences are between 1 and 3 (inclusive)
    const areDifferencesValid = differences.every(diff => Math.abs(diff) >= 1 && Math.abs(diff) <= 3);

    return (isIncreasing || isDecreasing) && areDifferencesValid;
}

// Function to analyze multiple reports and count the safe ones
function countSafeReports(data: string[][]): number {
    const reports = data.map(line => line.map(Number));
    return reports.filter(isSafeReport).length;
}

