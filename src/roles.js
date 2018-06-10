
var roles = {
    harvester: {
        count:8,
        priority: 7,
        name: "Harvester",
        template: [WORK,  CARRY,  MOVE, MOVE],
    },
    upgrader: {
        count: 4,
        priority: 10,
        name: "Upgrader",
        template: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    },
    builder: {
        count: 3,
        priority: 4,
        name: "Builder",
        template: [WORK, WORK, CARRY, CARRY, MOVE, MOVE ],
    },
    repairer: {
        count: 2,
        priority: -1,
        name: "Repairer",
        template: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    },
    carrier: {
        count: 2,
        priority: 12,
        name: "Carrier",
        template: [WORK,CARRY, CARRY, MOVE, MOVE],
    }
    
}

module.exports = roles;