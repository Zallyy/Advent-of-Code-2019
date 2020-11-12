const min = 172930
const max = 683082
const input = []
const solutions = []

function GetPasswords() {
    input.forEach(num => {
        //Parsing
        num = num.toString()
        num = num.split('')

        //Keep track of how many of each number there are
        let numbers = [0,0,0,0,0,0,0,0,0,0]

        let numberValid = false
        let containsAdjacent = false

        for (let i=0; i<(num.length-1); i++) {
            if (num[i] == num[i+1]) {
                containsAdjacent = true
                numbers[+num[i]]++
            }
            if (num[i] <= num[i+1]) {
                numberValid = true
            } 
            else {
                numberValid = false
                break
            }
        }

        if (numberValid && containsAdjacent) { //Part 1
            //Part 2 
            //If number has at least one double, its true
            if (numbers.includes(1)) {
                num = num.join('')
                solutions.push(+num)            
            }
        }
    })
}



function GenerateInput() {
    for (let i = min+1; i<max; i++) {
        input.push(i)
    }
}

GenerateInput()
GetPasswords()

console.log(`Solution: ${solutions.length}`)

