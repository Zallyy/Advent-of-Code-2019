// --- Day 2: 1202 Program Alarm ---

const fs = require('fs')

const sting_input = fs.readFileSync('./input.txt', 'UTF-8')
const number_input = sting_input.split(",").map(num => +num) //Converts input to array of numbers

const IntcodeComputer = (input, noun, verb) => {
    const array = [...input]
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
            case 99: //End Program
                return array[0]
        }
    }
}

for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        console.log(`Noun: ${noun} Verb: ${verb}`)
        if (IntcodeComputer(number_input, noun, verb) === 19690720) {
            console.log(`The answer: ${100 * noun + verb}`)
            return
        }
    }
}
