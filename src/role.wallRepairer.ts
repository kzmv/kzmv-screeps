import { roleBuilder } from './role.builder';

import {creepHelpers} from 'helpers.role';

var percentageW = 0.000100;
var percentageR = 0.001000;
export const roleWallRepairer = {
    run: (creep: Creep) => {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working) {
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s: AnyStructure) => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
            });

            var target = creep.pos.findClosestByPath(walls, {
                filter: (s: Structure) =>{
                    if(s.structureType == STRUCTURE_RAMPART){
                        return  s.hits / s.hitsMax < percentageR
                    } 
                    return s.hits / s.hitsMax < percentageW }
            });

            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            creepHelpers.extractFromStorage(creep);
        }
    }
};
