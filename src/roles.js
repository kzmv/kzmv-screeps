
var roles = {
    harvester: {
        count: 12,
        name: "Harvester",
        template: [WORK, WORK, CARRY, MOVE],
        priority: -11,
    },
    upgrader: {
        count: 3,
        name: "Upgrader",
        template: [WORK, WORK, CARRY, MOVE],
        priority: -9,
    },
    builder: {
        count: 1,
        name: "Builder",
        template: [WORK,  CARRY, MOVE, MOVE ],
        priority: -4,
    },
    repairer: {
        count: 1,
        name: "Repairer",
        template: [WORK, CARRY, MOVE, MOVE],
        priority: -1,
    },
    carrier: {
        count: 2,
        name: "Carrier",
        template: [WORK, CARRY, MOVE, MOVE],
        priority: -12,
    }
    
}

module.exports = roles;