import {creepHelpers} from 'helpers.role';
var _ = require('lodash');

export const roleCarrier = {
    run: function(creep: Creep) {
        creepHelpers.isWorking(creep);

        if (creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN 
                        ) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length == 0){
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE) ;
                    }
                });
            }
            
            targets = _.sortBy(targets,(s: AnyStructure) => creep.pos.getRangeTo(s))

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // if(_.sum(creep.carry) > 0){
            //     targets = creep.room.find(FIND_STRUCTURES, {
            //         filter: (structure) => {
            //             return (
            //                 structure.structureType == STRUCTURE_STORAGE) ;
            //         }
            //     });

            //         //for each mineral try to transfer
            //      if(creep.transfer(targets[0], RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //     }
            // }
        }
        else {
            if (creep.room.find(FIND_DROPPED_RESOURCES).length > 0) {
                creepHelpers.pickupResources(creep);
            } else if(creep.room.find(FIND_TOMBSTONES).length > 0) {
                creepHelpers.pickupToumbstones(creep);

            } else {
                creepHelpers.extractFromContainer(creep);
            }
        }
    }
};