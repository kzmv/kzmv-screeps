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


var civilianFactory = {
    getSourceId: function (creep) {
        var sourcesAccessPoints = _.sortBy(creep.room.getSourcesAcessPoints(), 'ap');
        var totalAps = 0;
        for (let source of sourcesAccessPoints) {
            totalAps += source.ap;
        }
        var creeps = _.filter(Game.creeps, (c) => c.memory.id == creep.id);
        sourcesAccessPoints = sourcesAccessPoints.map(s => {
            return { 
                ...s, 
                creepCount: Math.round(_.find(roles.getRoles(), r=> r.id = creep.memory.id).count / (totalAps / s.ap)) 
            }
        });
        
        for (let source of sourcesAccessPoints) {
            if (_.filter(Game.creeps, (c) => c.memory.id == creep.memory.id && c.memory.sourceId == source.id).length < source.creepCount) {
                return source.id;
            }
        }
        return sourcesAccessPoints[sourcesAccessPoints.length - 1].id;
    },
    run: function (spawner) {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var prioritisedRoles = _.sortBy(roles.getRoles(), (role) => role.priority)
        prioritisedRoles = _.filter(prioritisedRoles, role => _.filter(Game.creeps, (creep) => creep.memory.id == role.id).length < role.count)
        var role = prioritisedRoles[0];
        if (role) {
            var newName = role.name + Game.time;
            var dryRun = spawner.spawnCreep(role.template, newName, { dryRun: true })
            if (dryRun === 0) {
                console.log('Spawning new ' + role.type + ': ' + newName);
                var memory = { role: role.type, sourceId: undefined, working: true}
                memory['targetRoom'] = role.room;
                memory['home'] = spawner.room.name;
                memory['id'] = role.id;
                console.log('Memory: ' + memory);
                console.log('Template: ' + role.template);
                spawner.spawnCreep(role.template, newName,
                    { memory: memory });
                console.log("Next in queue: " + role.type)
                console.log("Priority queue: " + prioritisedRoles.map(r => r.name));

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