// import modules
import {roleHarvester} from 'role.harvester';
import {roleHarvesterPassive} from 'role.harvesterPassive';
import {roleBuilder} from 'role.builder';
import {roleUpgrader} from 'role.upgrader';
import {roleRepairer} from 'role.repairer';
import {roleWallRepairer} from 'role.wallRepairer';
import {roleCarrier} from 'role.carrier';
import {roleClaimer} from 'role.claimer';
import {roleORHarvester} from 'role.otherRoomHarvester';
import {roleNewbieCleaner} from 'role.newbieCleaner';
import {factory} from 'factory';


/*
    1. main roles refactoring
    2. Labs
    3. miner
    5. Defenrer creeps ( test sym )
    6. Atacker Creep ( test sym )
    7. 


    
    
*/
import { ErrorMapper } from "utils/ErrorMapper";
import { roleCarrierMain } from 'role.carrierMain';

interface LinkConfig {
    room: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}

let linkConfigs: LinkConfig[] = [
    {
        room: 'W16N41',
        fromX: 14,
        fromY: 44,
        toX: 22,
        toY: 29
    }
]

let roleRunMap: any = {
    "harvester": roleHarvester,
    "harvesterPassive": roleHarvesterPassive,
    "upgrader": roleUpgrader,
    "claimer": roleClaimer,
    "builder": roleBuilder,
    "carrier": roleCarrier,
    "carrierMain": roleCarrierMain,
    "repairer": roleRepairer,
    "wallRepairer": roleWallRepairer,
    "otherRoomHarvester": roleORHarvester,
    "newbieCleaner": roleNewbieCleaner
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        roleRunMap[creep.memory.role].run(creep);
    }


    for (var roomName of Object.keys(Game.rooms)) {
        var room = Game.rooms[roomName];
        var spawn = room.find(FIND_MY_SPAWNS)[0]
        if(spawn){
            factory.run(room.find(FIND_MY_SPAWNS)[0]);
        }
        

        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            
            var towers: any[] = _.filter(Game.structures, (s) => s.structureType === STRUCTURE_TOWER);
            for(let tower of towers){
                tower.attack(hostiles[0])
            }
            
        } else {
            var targets = Game.rooms[roomName].find(FIND_STRUCTURES).filter((s: Structure) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL  && s.structureType != STRUCTURE_RAMPART)
            var towers: any[] = _.filter(Game.structures, (s) => s.structureType === STRUCTURE_TOWER);
            for(let tower of towers){
                tower.repair(targets[0])
            }
        }
    }

    for(let link of linkConfigs){
        const linkFrom = Game.rooms[link.room].lookForAt('structure', link.fromX, link.fromY).filter(s => s.structureType == STRUCTURE_LINK)[0] as StructureLink;
        
        if(linkFrom.energy == linkFrom.energyCapacity){
            const linkTo = Game.rooms[link.room].lookForAt('structure', link.toX, link.toY).filter(s => s.structureType == STRUCTURE_LINK)[0] as StructureLink;
            linkFrom.transferEnergy(linkTo);
        }

        
    }
    
});
