// --- Day 2: 1202 Program Alarm ---

const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if (err) return console.log(err)
    else {
        let input = data.split(",") //Converts input to array of strings
        input = input.map(num => +num) //Converts input to an array of numbers
        input[1] = 12
        input[2] = 2
        input = IntcodeComputer(input)

        console.log(input)
    }
})

const IntcodeComputer = (input) => {
    for (let opcodeIndex = 0; opcodeIndex < input.length; opcodeIndex += 4) {
        let answer = 0
        switch(input[opcodeIndex]) {
            case 1: //Add Numbers
                answer = input[input[opcodeIndex+1]] + input[input[opcodeIndex+2]]
                input[input[opcodeIndex+3]] = answer
                break;
            case 2: //Multiply Numbers
                answer = input[input[opcodeIndex+1]] * input[input[opcodeIndex+2]]
                input[input[opcodeIndex+3]] = answer
                break;
            case 99: //End Program
                return input
        }
    }
}