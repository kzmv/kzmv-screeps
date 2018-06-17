
var roles = {
    getRoles: function() {return [
    {
        count: 2,
        type: 'harvester',
        name: "Harvester",
        template: [WORK, WORK ,WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
        priority: -11,
    },
    {
        count: 4,
        name: "Upgrader",
        type: 'upgrader',
        template: [WORK, WORK,  WORK,  WORK, CARRY,  CARRY, CARRY, CARRY, CARRY,  MOVE, MOVE, MOVE],
        priority: -9,
    },
    {
        count: 1,
        name: "Builder",
        type: 'builder',
        template: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE , MOVE ],
        priority: -4,
    },
    {
        count: 1,
        name: "Repairer",
        type: 'repairer',
        template: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE , MOVE ],
        priority: -1,
    },
    {
        count: 1,
        name: "WallRepairer",
        type: 'wallRepairer',
        template: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE , MOVE ],
        priority: -8,
    },
    {
        count: 3,
        name: "carrier",
        type: 'carrier',
        template: [WORK, CARRY, CARRY, CARRY,CARRY,CARRY, CARRY,  MOVE,  MOVE,  MOVE,  MOVE],
        priority: -13,
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        template: [ CLAIM,  MOVE, MOVE],
        priority: 1,
        room: 'W28N55'
    },
    {
        count: 3,
        name: "ORHarvester",
        type: 'otherRoomHarvester',
        room: 'W28N54',
        template: [WORK, WORK ,WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        priority: -11,
    },
    {
        count: 2,
        name: "ORUpgrader",
        type: 'otherRoomUpgrader',
        room: 'W28N54',
        template: [WORK, WORK ,WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        priority: -9,
    }
    
    ]}
}

module.exports = roles;