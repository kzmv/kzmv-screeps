var factory = require('factory');
module.exports = {
    isWorking: function (creep){
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working  && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
    },
    extractFromSource: function (creep) {
        var creepers = _.filter(Game.creeps, (c) => creep.memory.role == c.memory.role);
        if (!creep.memory.sourceId) {
            creep.memory.sourceId = factory.getSourceId(creep)
        }
        var source = Game.getObjectById(creep.memory.sourceId)
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    extractFromContainer: function (creep) {
        var creepers = _.filter(Game.creeps, (c) => creep.memory.role == c.memory.role);
        if (!creep.memory.containerId) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
            });
            if (targets.length > 0) {
                targets = _.sortBy(targets, s => creep.pos.getRangeTo(s))
                creep.memory.containerId = targets[0].id;
            }
        }

        var target = Game.getObjectById(creep.memory.containerId);
        if (target) {
            var op = creep.withdraw(target, RESOURCE_ENERGY)
            if (op == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } })
            } else if (op == OK) {
                creep.memory.containerId = undefined;
            }
        }
    },
    transferToContainer: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] < s.storeCapacity
        });
        targets = _.sortBy(targets, s => creep.pos.getRangeTo(s))
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
            filter: (s) => (s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_SPAWN ||
                s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    },
    transferToBuildings: function (creep) {
        var listOfStructures = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return listOfStructures.indexOf(structure.structureType) > -1 && structure.energy < structure.energyCapacity
            }
        });
        targets = _.sortBy(targets, s => creep.pos.getRangeTo(s))
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
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
    pickupToumbstones: function (creep) {
        var droppedResources = _.sortBy(creep.room.find(FIND_TOMBSTONES), r => creep.pos.getRangeTo(r));
        if (droppedResources.length > 0) {
            if (creep.withdraw(droppedResources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    },

};