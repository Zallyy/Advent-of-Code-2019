const fs = require('fs')

let input = fs.readFileSync('./input.txt', 'UTF-8')
input = input.split('\n')

let orbitList = []
let orbitChain = []
let relationships = 0 

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

const CountRelationships = () => {
    Object.keys(dict).forEach( key => {
        let currentKey = key
        while (currentKey != 'COM') {
            relationships++
            currentKey = dict[currentKey]
        }
    })
}

orbitList.forEach(({parent, child}) => {
    ListRelationships(parent,child)
})

console.log(dict)

CountRelationships()
console.log(relationships)
