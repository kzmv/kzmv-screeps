/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('civilian.factory');
 * mod.thing == 'a thing'; // true
 */
var roles = require('roles');

var idList = [
    "59f1a13a82100e1594f37efc",
    "59f1a13a82100e1594f37efe"
];

function getSourceId(roleType) {
    if ( _.filter(Game.creeps, (creep) => creep.memory.role == roleType &&  creep.memory.sourceId == idList[1]).length <= roles[roleType].count/3) {
         return idList[1];
    }
    return idList[0]
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
        console.log(prioritisedRoles)
        if (roleType) {
            var creep = roles[roleType];

            var newName = creep.name + Game.time;
            var dryRun = spawner.spawnCreep(creep.template, newName, { dryRun: true })
            if (dryRun === 0) {
                console.log('Spawning new ' + roleType + ': ' + newName);
                spawner.spawnCreep(creep.template, newName,
                    { memory: { role: roleType, sourceId: getSourceId(roleType), working: true } });
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