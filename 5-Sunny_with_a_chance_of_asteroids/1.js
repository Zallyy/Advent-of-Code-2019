// --- Day 2: 1202 Program Alarm ---

const fs = require('fs')

const sting_input = fs.readFileSync('./input.txt', 'UTF-8')
const number_input = sting_input.split(",").map(num => +num) //Converts input to array of numbers

const IntcodeComputer = (program, noun, verb) => {
    const array = [...program]
    array[1] = noun
    array[2] = verb
    for (let opcodeIndex = 0; opcodeIndex < array.length; opcodeIndex += 4) {
        let answer = 0
        switch(array[opcodeIndex]) {
            case 1: //Add Numbers
                answer = array[array[opcodeIndex+1]] + array[array[opcodeIndex+2]]
                array[array[opcodeIndex+3]] = answer
                break;
            case 2: //Multiply Numbers
                answer = array[array[opcodeIndex+1]] * array[array[opcodeIndex+2]]
                array[array[opcodeIndex+3]] = answer
                break;
            case 3: //Store at address
                answer = array[array[opcodeIndex+1]]
                break;
            case 99: //End Program
                return array[0]
        }
    }
}

IntcodeComputer(number_input)
