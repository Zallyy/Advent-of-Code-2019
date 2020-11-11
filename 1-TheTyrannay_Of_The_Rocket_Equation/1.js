// --- Day 1: The Tyranny of the Rocket Equation ---

const fs = require('fs')

fs.readFile('./input.txt', 'UTF-8', (err, data) => {
    if (err) return console.log(err)
    else {
        const modules = data.split("\n")
        modules.forEach( mass => {
            totalFuel += CalculateFuel(+mass)
        })
        console.log(`Total Fuel: ${totalFuel}`)
    }
})

let totalFuel = 0
const CalculateFuel = (mass) => {
    return Math.floor(mass/3) - 2
}