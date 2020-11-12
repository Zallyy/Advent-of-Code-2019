// --- Day 3: Crossed Wires ---
const fs = require('fs')

const wire1_data = fs.readFileSync('./wire1.txt', 'UTF-8')
const wire1 = wire1_data.split(",")
const wire2_data = fs.readFileSync('./wire2.txt', 'UTF-8')
const wire2 = wire2_data.split(",")

let currentCoordinates = {x:0, y:0}
let wire_1_graph = []
let wire_2_graph = []
let crossPoints = []
let wireStepsArray = []

const PlotMovement = (coordinate, wire) => {
    //Get Direction
    const direction = coordinate.slice(0,1) // R
    const amountToMove = coordinate.slice(1, coordinate.length) // 75

    const pointsCrossedAlong = []

    switch (direction) {
        case "R": 
            for (let i=0; i<amountToMove; i++) {
                pointsCrossedAlong.push({x: ++currentCoordinates.x, y: currentCoordinates.y})
            }
            break
        case "L": 
            for (let i=0; i<amountToMove; i++) {
                pointsCrossedAlong.push({x: --currentCoordinates.x, y: currentCoordinates.y})
            }
            break
        case "U": 
            for (let i=0; i<amountToMove; i++) {
                pointsCrossedAlong.push({x: currentCoordinates.x , y: ++currentCoordinates.y})
            }
            break
        case "D": 
            for (let i=0; i<amountToMove; i++) {
                pointsCrossedAlong.push({x: currentCoordinates.x , y: --currentCoordinates.y})
            }
            break
    }
    if (wire == 'wire1') {
        wire_1_graph = wire_1_graph.concat(pointsCrossedAlong)
    } else {
        wire_2_graph = wire_2_graph.concat(pointsCrossedAlong)
    }
}

const CheckForCrossedPaths = (wire_1_graph, wire_2_graph) => {
    for (let i=0; i<wire_1_graph.length; i++) {
        for (let j=0; j<wire_2_graph.length; j++) {
            if (wire_1_graph[i].x == wire_2_graph[j].x && 
                wire_1_graph[i].y == wire_2_graph[j].y && 
                (wire_1_graph[i].x !=0 && wire_1_graph[i].y !=0)) {
                crossPoints.push({x: wire_1_graph[i].x, y: wire_1_graph[i].y, wire1_steps:0, wire2_steps:0})
            }
        }
    }
}

const findNumberOfSteps = () => {
    crossPoints.forEach(markedPoint => {
        let wire1steps = wire_1_graph.findIndex(point => point.x == markedPoint.x && point.y == markedPoint.y)
        let wire2steps = wire_2_graph.findIndex(point => point.x == markedPoint.x && point.y == markedPoint.y)        
        let totalSteps = (wire1steps+1) + (wire2steps+1)
        wireStepsArray.push(totalSteps)
    })
}

wire1.forEach(wire => {
    PlotMovement(wire, "wire1")
})
currentCoordinates = {x:0, y:0} //Reset to the start point

wire2.forEach(wire => {
    PlotMovement(wire, "wire2")
})
currentCoordinates = {x:0, y:0} //Reset to the start point

CheckForCrossedPaths(wire_1_graph, wire_2_graph)

findNumberOfSteps()

wireStepsArray = wireStepsArray.sort((a,b) => a - b)
console.log(`Answer ${wireStepsArray[0]}`)


