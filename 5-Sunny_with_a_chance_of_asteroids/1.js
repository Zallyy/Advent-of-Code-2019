// --- Day 5: Sunny with a Chance of Asteroids ---
const prompt = require('prompt-sync')();
const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'UTF-8')
const string_input = input.split(",").map(num => num) //Converts input to array of numbers

const IntcodeComputer = (program) => {
    const array = program.map(num => +num)
    let userInput
    let ip //Instruction pointer 

    for (let i=0; i<array.length-1; i+=ip) {
        // console.log(`instruction: ${array[i]}`)
        // console.log(array)
                //  A B C D E
        let mode = ["1","0","0","0","0"]
        //Parse the mode 
        let modeString = array[i].toString().split('')

        for (j=0; j<modeString.length; j++) {
            mode[4-j] = modeString[(modeString.length-1)-j]
        }
        console.log(`Instruction: ${mode}`)
        
        //Set instruction pointer and paramaters
        let parameters = []

        switch (+mode[4]) {
            case 3:
                ip = 2 
                userInput = prompt('userInput: ');
                parameters.push({value: array[i+1], mode: 1})
                break
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
        // console.log(`Parameters ${parameters[0].value}`)

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
                console.log(`Saving ${userInput} to ${values[0]}`)
                array[values[0]] = +userInput
                break
            case 4: 
                console.log(array)
                console.log(values[0])
                console.log(`index: ${i}`)
                break
        }
        if (array[i + ip] == 99) {
            // return array
            // console.log(array)
            console.log("============================== \n Program Finish")
            return
        }
    }
}

// IntcodeComputer(["1101", "100", "-1", "4", "0"])
IntcodeComputer(string_input)
