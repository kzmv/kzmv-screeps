module.exports = {
    extractFromSource: function (creep) {
        var creepers = _.filter(Game.creeps, (c) => creep.memory.role == c.memory.role);
        if (creep.room.find(FIND_DROPPED_RESOURCES).length > 0) {
            this.pickupResources(creep);
        } else {
            var source = Game.getObjectById(creep.memory.sourceId)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    },
    extractFromContainer: function (creep, fallback) {
        var creepers = _.filter(Game.creeps, (c) => creep.memory.role == c.memory.role);
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
        });
        targets = _.sortBy(targets,s => creep.pos.getRangeTo(s))
        if (targets.length > 0) {
            if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else {
            this.extractFromSource(creep);
        }
    },
    transferToContainer: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity
        });
        targets = _.sortBy(targets,s => creep.pos.getRangeTo(s))
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else {
            this.transferToSpawn(creep);
        }
    },
    transferToSpawn: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_EXTENSION ||
                        s.structureType == STRUCTURE_SPAWN ||
                        s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    },
    transferToBuildings: function(creep) {
        var listOfStructures = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER]
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return listOfStructures.indexOf(structure.structureType) > -1 && structure.energy < structure.energyCapacity
            }
        });
        targets = _.sortBy(targets,s => creep.pos.getRangeTo(s))
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },
    pickupResources: function (creep) {
        var droppedResources = _.sortBy(creep.room.find(FIND_DROPPED_RESOURCES), r => creep.pos.getRangeTo(r));
        if (droppedResources.length > 0) {
            if (creep.pickup(droppedResources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    },
    
};