// --- Day 1: The Tyranny of the Rocket Equation ---
const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'UTF-8')
const modules = data.split("\n")

let totalFuel = 0
const CalculateFuel = (mass) => {
    if (mass <= 6) {
        return totalFuel
    } 
    let fuelNeeded = Math.floor(mass/3) - 2
    totalFuel += fuelNeeded
    return CalculateFuel(fuelNeeded)
}

modules.forEach( mass => {
    CalculateFuel(mass)
})
console.log(`Total Fuel: ${totalFuel}`)