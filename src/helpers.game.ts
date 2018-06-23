var _ = require('lodash');
import {roles, CreepRole} from 'roles';

export const getSourceAPs = (source: Source): number => {
    var accessPoints = 0;
    var room = source.room;
    var pos = source.pos;
    var structure = room.lookForAt(LOOK_STRUCTURES, pos.x + 1, pos.y)[0];
    if (room.lookForAt(LOOK_TERRAIN, pos.x + 1, pos.y)[0] != ("wall" as Terrain) && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x + 1, pos.y + 1)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x + 1, pos.y + 1)[0] != "wall"  && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x + 1, pos.y - 1)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x + 1, pos.y - 1)[0] != "wall" && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x - 1, pos.y)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x - 1, pos.y)[0] != "wall" && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x - 1, pos.y + 1)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x - 1, pos.y + 1)[0] != "wall" && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x - 1, pos.y -1)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x - 1, pos.y - 1)[0] != "wall" && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y +1)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x, pos.y + 1)[0] != "wall" && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    structure = room.lookForAt(LOOK_STRUCTURES, pos.x , pos.y-1)[0]
    if (room.lookForAt(LOOK_TERRAIN, pos.x, pos.y - 1)[0] != "wall" && (structure && structure.structureType != STRUCTURE_WALL)) {
        accessPoints = accessPoints + 1;
    }
    return accessPoints;
}

export const getSourceId = (creep: Creep): string => {
    var sourcesAccessPoints = _.sortBy(getSourcesAcessPoints(creep.room), 'ap');
    var totalAps = 0;
    for (let source of sourcesAccessPoints) {
        totalAps += source.ap;
    }
    var creeps = _.filter(Game.creeps, (c: Creep) => c.memory.id == creep.id);
    sourcesAccessPoints = sourcesAccessPoints.map((s: any) => {
        return { 
            ...s, 
            creepCount: Math.round(_.find(roles, (r: CreepRole)=> r.id == creep.memory.id).count / (totalAps / s.ap)) 
        }
    });
    
    for (let source of sourcesAccessPoints) {
        if (_.filter(Game.creeps, (c: Creep) => c.memory.id == creep.memory.id && c.memory.sourceId == source.id).length < source.creepCount) {
            return source.id;
        }
    }
    return sourcesAccessPoints[sourcesAccessPoints.length - 1].id;
}



export const getSourcesAcessPoints = function (room: Room) {
    var sources = room.find(FIND_SOURCES);
    var sourceArray = []
    for (let source of sources) {
        sourceArray.push({id: source.id, ap:getSourceAPs(source)});
    }
    return sourceArray;
}
