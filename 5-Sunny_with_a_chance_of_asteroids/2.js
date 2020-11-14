// --- Day 5: Sunny with a Chance of Asteroids ---
const fs = require('fs')

const input = fs.readFileSync('./input.txt', 'UTF-8')
const string_input = input.split(",").map(num => num) //Converts input to array of numbers

const IntcodeComputer = (program) => {
    const array = program.map(num => +num)
    let systemID = 5
   
    let ip = 0
    while (array[ip] != 99) {
        let mode = ["1","0","0","0","0"]
        let modeString = array[ip].toString().split('')

        for (j=0; j<modeString.length; j++) {
            mode[4-j] = modeString[(modeString.length-1)-j]
        }
        console.log(`Instruction: ${mode}`)
        let parameters = []
        switch (+mode[4]) {
            case 1: 
            case 2:
            case 7:
            case 8:
                parameters.push({value: array[ip+1], mode: mode[2]})
                parameters.push({value: array[ip+2], mode: mode[1]})
                parameters.push({value: array[ip+3], mode: mode[0]})
                break
            case 3:
            case 4: 
                parameters.push({value: array[ip+1], mode: 1})
                break
            case 5: 
            case 6:
                parameters.push({value: array[ip+1], mode: mode[2]})
                parameters.push({value: array[ip+2], mode: mode[1]})
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
                ip += 4
                array[values[2]] = values[0] + values[1]
                break
            case 2: 
                ip += 4
                array[values[2]] = values[0] * values[1]
                break
            case 3: 
                ip += 2  
                array[values[0]] = systemID
                break
            case 4: 
                ip += 2 
                console.log(array[values[0]])
                break
            case 5: 
                if (values[0] != 0) {
                    ip = values[1]
                } else {
                    ip += 3
                }
                break
            case 6: 
                if (values[0] == 0) {
                    ip = values[1]
                } else {
                    ip += 3
                }
                break
            case 7:
                ip += 4 
                if (values[0] < values[1]) {
                    values[2] = 1
                } else {
                    values[2] = 0
                }
                break
            case 8: 
                ip += 4
                if (values[0] == values[1]) {
                    values[2] = 1
                } else {
                    values[2] = 0
                }
                break
        }
    }
    console.log("============================== \n Program Finish \n============================== \n")
}

//Test cases
// IntcodeComputer(["1101", "100", "-1", "4", "0"])
// IntcodeComputer(["1002", "4", "3", "4", "33"])

//Main case
IntcodeComputer(string_input)
// IntcodeComputer([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99])