import { creepHelpers } from 'helpers.role';

export const roleNewbieCleaner = {
    // a function to run the logic for this role
    run: (creep: Creep) => {
        creepHelpers.isWorking(creep);
        creepHelpers.exitMove(creep);


        if (creep.memory.working) {
            if (creep.room.name == creep.memory.home) {
                creepHelpers.transferToContainer(creep);
            }
            else {
                var exit: any = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            if (creep.room.name == creep.memory.targetRoom) {
                let hostiles: Creep[] = _.sortBy(creep.room.find(FIND_HOSTILE_CREEPS), (c: Creep) => creep.pos.getRangeTo(c));
                let hostileStructs: Structure[] =  _.sortBy(creep.room.find(FIND_HOSTILE_STRUCTURES), (c: Structure) => creep.pos.getRangeTo(c)).filter(s => s.structureType !== STRUCTURE_CONTROLLER);
                let controller: StructureController =  _.sortBy(creep.room.find(FIND_HOSTILE_STRUCTURES), (c: Structure) => creep.pos.getRangeTo(c)).filter(s => s.structureType == STRUCTURE_CONTROLLER)[0] as StructureController;
                if (creep.room.find(FIND_TOMBSTONES).filter(t => _.sum(t.store) > 0).length > 0) {
                    creepHelpers.pickupToumbstones(creep);
                } else if (creep.room.find(FIND_DROPPED_RESOURCES).length > 0) {
                    creepHelpers.pickupResources(creep);
                } else if (hostiles.length > 0) {
                    if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostiles[0].pos);
                    }
                } else if (hostileStructs.length > 0) {
                    if (creep.attack(hostileStructs[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileStructs[0].pos);
                    }
                } else if (controller) {
                    if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller.pos);
                    }
                } else {
                    creep.memory.working = true;
                }
            }
            else {
                var exit: any = creep.room.findExitTo(creep.memory.targetRoom as string);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};