import {creepHelpers} from 'helpers.role';

export const roleORUpgrader = {
    run: (creep: Creep) => {
        creepHelpers.isWorking(creep);
        creepHelpers.exitMove(creep);

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