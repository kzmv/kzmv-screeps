import { creepHelpers } from 'helpers.role';
var _ = require('lodash');

export const roleCarrier = {
    run: function (creep: Creep) {
        creepHelpers.isWorking(creep);

        if (creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_STORAGE);
                }
            });
            targets = _.sortBy(targets, (s: AnyStructure) => creep.pos.getRangeTo(s))
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
//minerals carry
            for (let res in creep.carry) {
                res = res as ResourceConstant;
                if (res != RESOURCE_ENERGY && (creep.carry as any)[res]) {
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (
                                structure.structureType == STRUCTURE_STORAGE);
                        }
                    });
                    if (creep.transfer(targets[0], res as ResourceConstant) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
        else {
            if (creep.room.find(FIND_TOMBSTONES).filter(t => _.sum(t.store) > 0).length > 0) {
                creepHelpers.pickupToumbstones(creep);
            } else if (creep.room.find(FIND_DROPPED_RESOURCES).filter(r => r.amount > 50).length > 0) {
                creepHelpers.pickupResources(creep);
            } else {
                creepHelpers.extractFromContainer(creep);
            }
        }
    }
};