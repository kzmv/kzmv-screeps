var helper = require('role.helpers');

module.exports = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }


        var creepers = _.filter(Game.creeps, (c) => creep.memory.role == c.memory.role);
        if (creep.memory.working == true) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (creep.room.find(FIND_DROPPED_RESOURCES).length > 0) {
                helper.pickupResources(creep);
            } else {
                helper.extractFromContainer(creep);
            }
            
        }
    }
};