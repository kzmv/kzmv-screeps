/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('civilian.factory');
 * mod.thing == 'a thing'; // true
 */
var roles = require('roles');
var _ = require('lodash');


function getSourceId(roleType, room) {
    var sourcesAccessPoints = _.sortBy(room.getSourcesAcessPoints(), 'ap');
    var totalAps = 0;
    for (let source of sourcesAccessPoints) {
        totalAps += source.ap;
    }
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleType);
    sourcesAccessPoints = sourcesAccessPoints.map(s => {
        return { 
            ...s, 
            creepCount: Math.round(roles[roleType].count / (totalAps / s.ap)) 
        }
    });
    for (let source of sourcesAccessPoints) {
        if (_.filter(Game.creeps, (creep) => creep.memory.role == roleType && creep.memory.sourceId == source.id).length < source.creepCount) {
            return source.id;
        }
    }
    return sourcesAccessPoints[sourcesAccessPoints.length - 1].id;
}

var civilianFactory = {
    run: function (spawner) {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {

                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var prioritisedRoles = _.sortBy(Object.keys(roles), (roleName) => roles[roleName].priority)
        prioritisedRoles = _.filter(prioritisedRoles, r => _.filter(Game.creeps, (creep) => creep.memory.role == r).length < roles[r].count)
        var roleType = prioritisedRoles[0];
        if (roleType) {
            var creep = roles[roleType];
            var newName = creep.name + Game.time;
            var dryRun = spawner.spawnCreep(creep.template, newName, { dryRun: true })
            if (dryRun === 0) {
                console.log('Spawning new ' + roleType + ': ' + newName);
                var memory = { role: roleType, sourceId: getSourceId(roleType, spawner.room), working: true}
                memory['targetRoom'] = roles[roleType].room;
                console.log('Memory: ' + memory);
                console.log('Template: ' + creep.template);
                spawner.spawnCreep(creep.template, newName,
                    { memory: memory });
                console.log("Next in queue: " + roleType)
                console.log("Priority queue: " + prioritisedRoles);

            }
        }

        if (spawner.spawning) {
            var spawningCreep = Game.creeps[spawner.spawning.name];
            spawner.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawner.pos.x + 1,
                spawner.pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
}

module.exports = civilianFactory;