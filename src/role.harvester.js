var helper = require('role.helpers');

module.exports = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working  && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        var creepers = _.filter(Game.creeps, (c) => creep.memory.role == c.memory.role);
        if (creep.memory.working) {
            helper.transferToContainer(creep);
        } 
        else {
            helper.extractFromSource(creep);
        }
    }
};