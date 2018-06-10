
var roles = {
    harvester: {
        count:8,
        priority: 7,
        name: "Harvester",
        template: [WORK, WORK, CARRY, MOVE],
    },
    upgrader: {
        count: 3,
        priority: 9,
        name: "Upgrader",
        template: [WORK, CARRY, MOVE, MOVE],
    },
    builder: {
        count: 2,
        priority: 4,
        name: "Builder",
        template: [WORK, CARRY, MOVE, MOVE ],
    },
    repairer: {
        count: 1,
        priority: -1,
        name: "Repairer",
        template: [WORK, CARRY, MOVE, MOVE],
    },
    carrier: {
        count: 2,
        priority: 12,
        name: "Carrier",
        template: [WORK, CARRY, MOVE, MOVE],
    }
    
}

module.exports = roles;