import {creepHelpers} from 'helpers.role';

export const roleHarvester = {
    run: function (creep: Creep) {
        creepHelpers.isWorking(creep);
        if (creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s: AnyStructure) => (s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_SPAWN ||
                s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
        });
            if(targets.length >0){
                creepHelpers.transferToSpawn(creep);
            }else {
                creepHelpers.transferToContainer(creep);
            }

        }
        else {
            creepHelpers.extractFromSource(creep);
        }
    }
};