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
import {roleORUpgrader} from 'role.otherRoomUpgrader';
import {roleNewbieCleaner} from 'role.newbieCleaner';
import {factory} from 'factory';


/*
    1. CLI
    - Ataccker
    2. Optimize Role Helper and Roles
    6. Wall Builder
    7. Scan Repair
    8. Scan pickup
    - carrier resources
    
*/
import { ErrorMapper } from "utils/ErrorMapper";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'harvesterPassive') {
            roleHarvesterPassive.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if (creep.memory.role == 'otherRoomHarvester') {
            roleORHarvester.run(creep);
        }
        else if (creep.memory.role == 'otherRoomUpgrader') {
            roleORUpgrader.run(creep);
        } else if(creep.memory.role == 'newbieCleaner') {
            roleNewbieCleaner.run(creep);
        }
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
            
        }
    }
});
