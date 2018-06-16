
var roles = {
    harvester: {
        count: 2,
        name: "Harvester",
        template: [WORK, WORK , WORK, WORK,  WORK, MOVE, MOVE, MOVE],
        priority: -11,
    },
    upgrader: {
        count: 4,
        name: "Upgrader",
        template: [WORK, WORK,  WORK,  WORK, CARRY,  CARRY, CARRY, CARRY, CARRY,  MOVE, MOVE, MOVE],
        priority: -9,
    },
    builder: {
        count: 1,
        name: "Builder",
        template: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE , MOVE ],
        priority: -4,
    },
    repairer: {
        count: 1,
        name: "Repairer",
        template: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE , MOVE ],
        priority: -1,
    },
    wallRepairer: {
        count: 1,
        name: "WallRepairer",
        template: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE , MOVE ],
        priority: -1,
    },
    carrier: {
        count: 2,
        name: "Carrier",
        template: [ CARRY, CARRY, CARRY,CARRY,  MOVE,  MOVE],
        priority: -12,
    },
    claimer: {
        count: 1,
        name: "Claimer",
        template: [ CLAIM,  MOVE, MOVE],
        priority: 1,
        room: 'W28N54'
    }
    
}

module.exports = roles;