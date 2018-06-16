module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
        if (creep.room.name != creep.memory.targetRoom) {
            // find exit to target room

            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            // try to claim controller

            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                var path = creep.room.findPath(creep.pos, creep.room.controller,{maxRooms: 1});
                creep.moveTo(path[0].direction);
            }
        }
    }
};