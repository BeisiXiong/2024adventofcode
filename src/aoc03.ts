import {join} from "path";
import {readFileSync} from "fs";

export function aoc03() {
    //use the Example input data below and use the Analyze the input data to run the code
    const inputPath = join(__dirname, '..', 'Inputs', 'aoc03.txt');

    function processFileToArray(filePath: string): string[] {
        const input = readFileSync(filePath, 'utf-8');
        const words = input.trim().split(/\s+/);
        return words;
    }
    const wordsArray = processFileToArray(inputPath);
   // console.log(wordsArray);

    // Example corrupted memory string
    const corruptedMemory = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const total = processMemory(wordsArray.join(''));
    console.log(`Total number is: ${total}`);
}

function processMemory(corruptedMemory: string): number {

    // Regular expression to match valid `mul(X,Y)` instructions.
    const mulRegex = /mul\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
    let match: RegExpExecArray | null;
    let sum = 0;

    // Use a loop to extract all matches.
    while ((match = mulRegex.exec(corruptedMemory)) !== null) {
        const x = parseInt(match[1], 10); // Extract the first number.
        const y = parseInt(match[2], 10); // Extract the second number.
        sum += x * y; // Multiply and add to the sum.
    }

    return sum;
}



