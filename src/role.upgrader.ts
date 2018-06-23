import {creepHelpers} from 'helpers.role';


export const roleUpgrader = {
    run: (creep: Creep) => {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {

            if (creep.upgradeController(creep.room.controller as StructureController) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller as StructureController);
            }
        }
        else {

            if (creep.room.find(FIND_DROPPED_RESOURCES).length > 0) {
                creepHelpers.pickupResources(creep);
            } else {
                creepHelpers.extractFromContainer(creep);
            }
            
        }
    }
};