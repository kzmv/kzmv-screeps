var helper = require('role.helpers');

module.exports = {
    run: function(creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        

        if(creep.pos.x*creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49){
            console.log("center hack move");
            if (creep.room.name == creep.memory.home) {
                creep.moveTo(new RoomPosition(25,25,creep.memory.home));
            } else {
                creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom));
            }
            
        }

        if (creep.memory.working) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            if (creep.room.name == creep.memory.targetRoom) {
                helper.extractFromSource(creep);
            }
            else {
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};