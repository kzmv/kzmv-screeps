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
            if (creep.room.name == creep.memory.home) {
                creep.moveTo(new RoomPosition(25,25,creep.memory.home),{maxRooms: 1, visualizePathStyle: { stroke: '#ffaa00' }});
                creep.moveTo(new RoomPosition(25,25,creep.memory.home),{maxRooms: 1, visualizePathStyle: { stroke: '#ffaa00' }});
            } else {
                creep.moveTo(new RoomPosition(25,25,creep.memory.targetRoom),{maxRooms: 1, visualizePathStyle: { stroke: '#ffaa00' }});
            }
            
        }

        if (creep.memory.working) {
            if (creep.room.name == creep.memory.home) {

                helper.transferToContainer(creep);
            }
            else {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                var repairStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL  && s.structureType != STRUCTURE_RAMPART
                });
                
                if (constructionSite != undefined) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
                else if(repairStructure){
                    if(creep.repair(repairStructure) == ERR_NOT_IN_RANGE){
                        creep.moveTo(repairStructure);
                    }
                }
                else {
                    var exit = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffaa00' } });
                }
                
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