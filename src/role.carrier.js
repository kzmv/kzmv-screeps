var helper = require('role.helpers');
module.exports = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working  && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length==0){
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE) ;
                    }
                });
            }
            
            targets = _.sortBy(targets,s => creep.pos.getRangeTo(s))
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            if (creep.room.find(FIND_DROPPED_RESOURCES).length > 0) {
                helper.pickupResources(creep);
            } else if(creep.room.find(FIND_TOMBSTONES).length > 0) {
                helper.pickupToumbstones(creep);
                
            } else {
                helper.extractFromContainer(creep);
            }
        }
    }
};