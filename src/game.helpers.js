function getSourceAccessPoints(source) {
    var accessPoints = 0;
    var room = source.room;
    var pos = source.pos;
    if (room.lookForAt(LOOK_TERRAIN, pos.x + 1, pos.y) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x + 1, pos.y + 1) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x + 1, pos.y - 1) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x - 1, pos.y) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x - 1, pos.y + 1) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x - 1, pos.y - 1) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x, pos.y + 1) != "wall") {
        accessPoints = accessPoints + 1;
    }
    if (room.lookForAt(LOOK_TERRAIN, pos.x, pos.y - 1) != "wall") {
        accessPoints = accessPoints + 1;
    }
    return accessPoints;
}

Room.prototype.getSourcesAcessPoints = function () {
    var sources = this.find(FIND_SOURCES);
    var sourceArray = []
    for (let source of sources) {
        sourceArray.push({id: source.id, ap:getSourceAccessPoints(source)});
    }
    return sourceArray;
}
