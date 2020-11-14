// --- Day 5: Sunny with a Chance of Asteroids ---
const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'UTF-8')
const string_input = input.split(",").map(num => num) //Converts input to array of numbers

const IntcodeComputer = (program) => {
    const array = program.map(num => +num)
    let userInput = 1
    let ip //Instruction pointer 

    for (let i=0; i<array.length-1; i+=ip) {
        // console.log(array)
        //           A   B   C   D   E
        let mode = ["1","0","0","0","0"]
        //Parse the mode 
        let modeString = array[i].toString().split('')
        console.log(modeString)
        for (j=0; j<modeString.length; j++) {
            mode[4-j] = modeString[(modeString.length-1)-j]
        }
        console.log(`Instruction: ${mode}`)
        
        let parameters = []
        switch (+mode[4]) {
            case 3:
            case 4: 
                ip = 2 
                parameters.push({value: array[i+1], mode: 1})
                break
            default: 
                ip = 4
                parameters.push({value: array[i+1], mode: mode[2]})
                parameters.push({value: array[i+2], mode: mode[1]})
                parameters.push({value: array[i+3], mode: mode[0]})
        }
        let values = []
        parameters.forEach(param => {
            if (param.mode == 1) {
                values.push(param.value)
            } else {
                values.push(array[param.value])
            }
        })

        switch(+mode[4]) {
            case 1: 
                array[values[2]] = values[0] + values[1]
                break
            case 2: 
                array[values[2]] = values[0] * values[1]
                break
            case 3: 
                array[values[0]] = +userInput
                break
            case 4: 
                console.log(array[values[0]])
                break
        }
        if (array[i + ip] == 99) {
            console.log("============================== \n Program Finish \n============================== \n")
            return
        }
    }
}

//Test cases
// IntcodeComputer(["1101", "100", "-1", "4", "0"])
// IntcodeComputer(["1002", "4", "3", "4", "33"])

//Main case
IntcodeComputer(string_input)
