export interface CreepRole {
    count: number;
    type: string;
    id: string;
    name: string;
    template: any;
    priority: number;
    targetRoom?: string;
    run?: Function;
}

export const roles: CreepRole[] = [
    {
        count: 0,
        type: 'newbieCleaner',
        id: 'newbieCleaner-W17N42',
        name: "NewbieCleaner",
        targetRoom: 'W17N42',
        template: {
            "tough": 14,
            "attack": 5,
            "work": 1,
            "carry": 2,
            "move": 4
        },
        priority: -13,
    },
    {
        count: 0,
        type: 'harvester',
        id: 'harvester1',
        name: "Harvester",
        template: {
            "work": 2,
            "carry": 1,
            "move": 1
        },
        priority: -33,
    },
    {
        count: 2,
        type: 'harvesterPassive',
        id: 'harvesterPassive1',
        name: "HarvesterPassive",
        template: {
            "work": 6,
            "carry": 1,
            "move": 2
        },
        priority: -30,

    },
    {
        count: 2,
        name: "carrier",
        type: 'carrier',
        id: 'carrier1',
        template: {
            "work": 1,
            "carry": 6,
            "move": 4
        },
        priority: -31,
    },
    {
        count: 1,
        name: "carrierMain",
        type: 'carrierMain',
        id: 'carrierMainMini',
        template: {
            "carry": 4,
            "move": 2
        },
        priority: -22,
    },
    {
        count: 2,
        name: "carrierMain",
        type: 'carrierMain',
        id: 'carrierMain',
        template: {
            "carry": 6,
            "move": 4
        },
        priority: -32,
    },
    {
        count: 2,
        name: "Upgrader",
        type: 'upgrader',
        id: 'upgrader1',
        template: {
            "work": 4,
            "carry": 8,
            "move":2
        },
        priority: -23,
    },
    {
        count: 2,
        name: "Builder",
        type: 'builder',
        id: 'builder1',
        template: {
            "work": 4,
            "carry": 6,
            "move":6
        },
        priority: -22,
    },
    {
        count: 0,
        name: "Repairer",
        type: 'repairer',
        id: 'repairer1',
        template: {
            "work": 2,
            "carry": 4,
            "move":4
        },
        priority: -23,
    },
    {
        count: 1,
        name: "WallRepairer",
        type: 'wallRepairer',
        id: 'wallRepairer1',
        template: {
            "work": 2,
            "carry": 4,
            "move":4
        },
        priority: -19,
    },
    {
        count: 3,
        name: "ORHarvesterW15N41",
        type: 'otherRoomHarvester',
        targetRoom: 'W15N41',
        id: 'otherRoomHarvester1',
        template: {
            "work": 5,
            "carry": 10,
            "move":8
        },
        priority: -17,
    },
    {
        count: 3,
        name: "ORHarvesterW16N42",
        type: 'otherRoomHarvester',
        targetRoom: 'W16N42',
        id: 'otherRoomHarvester2',
        template: {
            "work": 5,
            "carry": 10,
            "move":8
        },
        priority: -15,
    },
    {
        count: 3,
        name: "ORHarvester-W17N41",
        type: 'otherRoomHarvester',
        targetRoom: 'W17N41',
        id: 'otherRoomHarvester-W17N41',
        template: {
            "work": 5,
            "carry": 10,
            "move":8
        },
        priority: -17,
    },
    {
        count: 3,
        name: "ORHarvester-W14N41",
        type: 'otherRoomHarvester',
        targetRoom: 'W14N41',
        id: 'otherRoomHarvester-W14N41',
        template: {
            "work": 5,
            "carry": 10,
            "move":8
        },
        priority: -17,
    },
    {
        count: 3,
        name: "ORHarvester-W18N41",
        type: 'otherRoomHarvester',
        targetRoom: 'W18N41',
        id: 'otherRoomHarvester-W18N41',
        template: {
            "work": 5,
            "carry": 10,
            "move":8
        },
        priority: -17,
    },
    {
        count: 1,
        name: "ClaimerW18N41",
        type: 'claimer',
        id: 'claimer-W18N41',
        template: {
            "claim": 2,
            "move":4
        },
        priority: 1,
        targetRoom: 'W18N41'
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        id: 'claimer2',
        template: {
            "claim": 2,
            "move":4
        },
        priority: -18,
        targetRoom: 'W15N41'
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        id: 'claimer1',
        template: {
            "claim": 2,
            "move":4
        },
        priority: 1,
        targetRoom: 'W16N42'
    },
    {
        count: 1,
        name: "Claimer",
        type: 'claimer',
        id: 'claimerW17N41',
        template: {
            "claim": 2,
            "move":4
        },
        priority: 1,
        targetRoom: 'W17N41'
    },
    {
        count: 1,
        name: "ClaimerW14N41",
        type: 'claimer',
        id: 'claimerW14N41',
        template: {
            "claim": 2,
            "move":4
        },
        priority: 1,
        targetRoom: 'W14N41'
    },

]

