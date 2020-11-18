const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')
input = input.split('\n')

let orbitList = []
let orbitChain = []
let childParentList = {}
let orbitalTransfers = 0 

//Parse into relationships
input.forEach(orbitalPair => {
    orbitalPair = orbitalPair.split(')')
    orbitList.push({parent: orbitalPair[0], child: orbitalPair[1]})
})

const GetParentInstances = (parent) => {
    let indexes = []    
    for (let i=0; i<orbitList.length; i++) {
        if (orbitList[i].parent == parent) {
            indexes.push(i)
        }
    }
    return indexes
}

orbitList.forEach(({parent}) => {
    if (orbitChain.includes(parent)) {
        return
    }
    let chain = ({parent: parent, children:[]})
    let instances = GetParentInstances(parent)
    instances.forEach(index => {
        chain.children.push(orbitList[index].child)
    })
    orbitChain.push(chain)
})

function removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject  = {};

    for (i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

orbitChain = removeDuplicates(orbitChain, "parent")

let dict = {}

const ListRelationships = (parent, child) => {
    if (!(child in dict)) {
        dict[child] = []
    } 
    dict[child].push(parent)
}

const ListOfAllParents = (planets) => {
    //Grab a list of parents for each
    planets.forEach(point => {
        let currentKey = point
        while (currentKey != 'COM') {
            if (!(point in  childParentList)) {
                childParentList[point] = []
            }
            // console.log(`${point} ${currentKey}`)
            childParentList[point].push(dict[currentKey])
            currentKey = dict[currentKey]
        }
    })
}

const FindCommonAncestor = () => {
    let keys = Object.keys(childParentList)
    for (let i=0; i<childParentList[keys[0]].length; i++) {
        for (let j=0; j<childParentList[keys[1]].length; j++) {
            if (childParentList[keys[0]][i] == childParentList[keys[1]][j]) {
                orbitalTransfers = i + j - 2;
                return
            }
        }
    }
}

orbitList.forEach(({parent, child}) => {
    ListRelationships(parent,child)
})

ListOfAllParents(['YOU', 'SAN'])
FindCommonAncestor()

console.log(`Orbital Transfers: ${orbitalTransfers}`)