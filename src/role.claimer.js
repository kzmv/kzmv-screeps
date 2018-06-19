module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        
        

        if (creep.room.name != creep.memory.targetRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
            
                    //fix for wall stuck
            if(creep.pos.x*creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49){
                creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom));
            }
        }
        else {
            if(Game.rooms.length < Game.gcl){
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            
        }
    }
};