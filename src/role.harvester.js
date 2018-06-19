var helper = require('role.helpers');

module.exports = {
    run: function (creep) {
        helper.isWorking(creep);
        if (creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_SPAWN ||
                s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
        });
            if(targets.length >0){
                helper.transferToSpawn(creep);
            }else {
                helper.transferToContainer(creep);
            }

        }
        else {
            helper.extractFromSource(creep);
        }
    }
};