

export interface CreepRole {
    count: number;
    type: string;
    id: string;
    name: string;
    template: any[];
    priority: number;
    targetRoom?: string;
}

export const roles: CreepRole[] = [
    {
        count: 0,
        type: 'harvester',
        id: 'harvester1',
        name: "Harvester",
        template: [WORK, WORK, CARRY, MOVE],
        priority: -33,
    },
    {
        count: 2,
        type: 'harvesterPassive',
        id: 'harvesterPassive1',
        name: "HarvesterPassive",
        template: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE],
        priority: -30,
    },
    {
        count: 2,
        name: "carrier",
        type: 'carrier',
        id: 'carrier1',
        template: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: -31,
    },
    {
        count: 4,
        name: "Upgrader",
        type: 'upgrader',
        id: 'upgrader1',
        template: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        priority: -23,
    },
    {
        count: 1,
        name: "Builder",
        type: 'builder',
        id: 'builder1',
        template: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: -22,
    },
    {
        count: 1,
        name: "Repairer",
        type: 'repairer',
        id: 'repairer1',
        template: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        priority: -23,
    },
    {
        count: 2,
        name: "ORHarvester2",
        type: 'otherRoomHarvester',
        targetRoom: 'W16N42',
        id: 'otherRoomHarvester2',
        template: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        priority: -18,
    },
    {
        count: 2,
        name: "ORHarvester1",
        type: 'otherRoomHarvester',
        targetRoom: 'W15N41',
        id: 'otherRoomHarvester1',
        template: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        priority: -17,
    },
    {
        count: 5,
        name: "ORHarvester3",
        type: 'otherRoomHarvester',
        targetRoom: 'W14N41',
        id: 'otherRoomHarvester3',
        template: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        priority: -17,
    },
    {
        count: 1,
        name: "WallRepairer",
        type: 'wallRepairer',
        id: 'wallRepairer1',
        template: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        priority: -19,
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        id: 'claimer1',
        template: [CLAIM, CLAIM, MOVE, MOVE],
        priority: 1,
        targetRoom: 'W15N41'
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        id: 'claimer2',
        template: [CLAIM, CLAIM, MOVE, MOVE],
        priority: 1,
        targetRoom: 'W14N41'
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        id: 'claimerW16N42',
        template: [CLAIM, CLAIM, MOVE, MOVE],
        priority: 1,
        targetRoom: 'W16N42'
    },
    {
        count: 0,
        name: "ORUpgrader",
        type: 'otherRoomUpgrader',
        id: 'otherRoomUpgrader1',
        targetRoom: 'W15N41',
        template: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        priority: -9,
    }

]

