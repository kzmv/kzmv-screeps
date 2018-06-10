/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('civilian.factory');
 * mod.thing == 'a thing'; // true
 */
var roles = require('roles');

var civilianFactory = {
    run: function (spawner) {

        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        console.log(" ")
        var prioritisedRoles = _.sortBy(Object.keys(roles), (roleName) => roles[roleName].priority)
        for (var i = 0; i < prioritisedRoles.length; i++) {
            var roleType = prioritisedRoles[i]
            var creepers = _.filter(Game.creeps, (creep) => creep.memory.role == roleType);
            console.log(roleType + ' ' + creepers.length)

            var creep = roles[roleType];
            if (creepers.length < creep.count) {
                var newName = creep.name + Game.time;
                var dryRun = spawner.spawnCreep(creep.template, newName,
                    { memory: { role: roleType }, dryRun: true })
                if (dryRun === 0) {
                    console.log('Spawning new ' + roleType + ': ' + newName);
                    spawner.spawnCreep(creep.template, newName,
                        { memory: { role: roleType, working: true } });
                }

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