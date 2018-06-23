import {creepHelpers} from 'helpers.role';

export const roleORUpgrader = {
    run: (creep: Creep) => {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        

        if(creep.pos.x*creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49){
            if (creep.room.name == creep.memory.home) {
                creep.moveTo(new RoomPosition(25,25,creep.memory.home));
            } else {
                creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom as string));
            }
            
        }

        if (creep.memory.working) {
            if (creep.upgradeController(creep.room.controller as StructureController) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller as StructureController);
            }
        }
        else {
            if (creep.room.name == creep.memory.targetRoom) {
                creepHelpers.extractFromSource(creep);
            }
            else {
                var exit:any = creep.room.findExitTo(creep.memory.targetRoom as string);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};