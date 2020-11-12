
const min = 172930
const max = 683082
const input = []
const solutions = []

function GetPasswords() {
    input.forEach(num => {
        let numberValid = false
        let containsAdjacent = false
        num = num.toString()
        num = num.split('')
        for (let i=0; i<(num.length-1); i++) {
            if (num[i] == num[i+1]) {
                containsAdjacent = true
            }
            if (num[i] <= num[i+1]) {
                numberValid = true
            } 
            else {
                numberValid = false
                break
            }
        }
        if (numberValid && containsAdjacent) {
            num = num.join('')
            solutions.push(+num)
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
console.log(solutions.length)