import { factory } from 'factory';
import { getSourceId } from 'helpers.game';
var _ = require('lodash');

export const creepHelpers = {
    exitMove: (creep: Creep) => {
        if (creep.pos.x * creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49) {
            if (creep.room.name == creep.memory.home) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.home), { maxRooms: 1, visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.targetRoom as string), { maxRooms: 1, visualizePathStyle: { stroke: '#ffaa00' } });
            }

        }
    },
    isWorking: function (creep: Creep) {
        if (creep.memory.working && _.sum(creep.carry) == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.working = true;
        }
    },
    extractFromSource: function (creep: Creep) {
        var creepers = _.filter(Game.creeps, (c: Creep) => creep.memory.id == c.memory.id);
        if (!creep.memory.sourceId) {
            creep.memory.sourceId = getSourceId(creep)
        }
        var source: Source = Game.getObjectById(creep.memory.sourceId) as Source;
        if (source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    extractFromContainer: function (creep: Creep) {
        var creepers = _.filter(Game.creeps, (c: Creep) => creep.memory.role == c.memory.role);
        if (!creep.memory.containerId) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
            });
            if (targets.length > 0) {
                targets = _.sortBy(targets, (s: Structure) => creep.pos.getRangeTo(s))
                creep.memory.containerId = targets[0].id;
            }
        }

        var target: StructureContainer | null = Game.getObjectById(creep.memory.containerId);
        if (target) {
            var op = creep.withdraw(target, RESOURCE_ENERGY)
            if (op == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } })
            } else if (op == OK) {
                creep.memory.containerId = undefined;
            }
        }
    },
    transferToContainer: function (creep: Creep) {
        let targets: Structure[] = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] < s.storeCapacity
        });
        targets = _.sortBy(targets, (s: Structure) => creep.pos.getRangeTo(s));
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        } else {
            this.transferToSpawn(creep);
        }
    },
    transferToSpawn: function (creep: Creep) {
        let targets: AnyStructure[] = creep.room.find(FIND_STRUCTURES, {
            filter: (s: AnyStructure) => (s.structureType == STRUCTURE_EXTENSION ||
                s.structureType == STRUCTURE_SPAWN ||
                s.structureType == STRUCTURE_TOWER) && s.energy < s.energyCapacity
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    },
    pickupResources: function (creep: Creep) {
        var droppedResources: Resource[] = _.sortBy(creep.room.find(FIND_DROPPED_RESOURCES), (r: Resource) => creep.pos.getRangeTo(r));
        if (droppedResources.length > 0) {

            if (creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedResources[0], { visualizePathStyle: { stroke: '#ffaa00' } })
            }
        }
    },
    pickupToumbstones: function (creep: Creep) {
        var tombstones: Tombstone[] = _.sortBy(creep.room.find(FIND_TOMBSTONES), (t: Tombstone) => creep.pos.getRangeTo(t));
        tombstones = tombstones.filter((t: Tombstone) => _.sum(t.store) > 0);
        if (tombstones.length > 0) {
            for (let resource in tombstones[0].store)
                if (creep.withdraw(tombstones[0], resource as ResourceConstant) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstones[0], { visualizePathStyle: { stroke: '#ffaa00' } })
                }
        }
    }
}