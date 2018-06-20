
var roles = {
    getRoles: function() {return [
    {
        count: 8,
        type: 'harvester',
        id: 'harvester1',
        name: "Harvester",
        template: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        priority: -23,
    },
    {
        count: 3,
        name: "Upgrader",
        type: 'upgrader',
        id: 'upgrader1',
        template: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        priority: -29,
    },
    {
        count: 2,
        name: "Builder",
        type: 'builder',
        id: 'builder1',
        template: [WORK, WORK, CARRY, MOVE, MOVE],
        priority: -24,
    },
    {
        count: 1,
        name: "Repairer",
        type: 'repairer',
        id: 'repairer1',
        template: [WORK,WORK, CARRY, MOVE, MOVE],
        priority: -23,
    },
    {
        count: 5,
        name: "ORHarvester2",
        type: 'otherRoomHarvester',
        room: 'W16N42',
        id: 'otherRoomHarvester2',
        template: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: -18,
    },
   {
        count: 6,
        name: "ORHarvester1",
        type: 'otherRoomHarvester',
        room: 'W15N41',
        id: 'otherRoomHarvester1',
        template: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: -17,
    },
    {
        count: 5,
        name: "ORHarvester3",
        type: 'otherRoomHarvester',
        room: 'W14N41',
        id: 'otherRoomHarvester3',
        template: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: -17,
    },
    {
        count: 1,
        name: "WallRepairer",
        type: 'wallRepairer',
        id: 'wallRepairer1',
        template: [WORK, WORK,  CARRY, CARRY, MOVE , MOVE ],
        priority: -8,
    },
    {
        count: 1,
        name: "carrier",
        type: 'carrier',
        id: 'carrier1',
        template: [WORK, CARRY, CARRY, MOVE, MOVE],
        priority: -23,
    },
    {
        count: 2,
        name: "Claimer",
        type: 'claimer',
        id: 'claimer1',
        template: [ CLAIM,  MOVE, MOVE],
        priority: 1,
        room: 'W15N41'
    },
    {
        count: 2,
        name: "Claimer",
        type: 'claimer',
        id: 'claimer2',
        template: [ CLAIM,  MOVE, MOVE],
        priority: 1,
        room: 'W14N41'
    },
    {
        count: 0,
        name: "ORUpgrader",
        type: 'otherRoomUpgrader',
        id: 'otherRoomUpgrader1',
        room: 'W15N41',
        template: [WORK, WORK ,WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        priority: -9,
    }
    
    ]}
}

module.exports = roles;