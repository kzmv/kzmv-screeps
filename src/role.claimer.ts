import {creepHelpers} from 'helpers.role';

export const roleClaimer = {
    // a function to run the logic for this role
    run: (creep: Creep) => {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        

        if (creep.room.name != creep.memory.targetRoom) {
            var exit: any = creep.room.findExitTo(creep.memory.targetRoom as string);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
                if (creep.reserveController(creep.room.controller as StructureController) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller as StructureController);
                }
            
        }
    }
};