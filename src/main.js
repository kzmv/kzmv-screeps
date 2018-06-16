// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleCarrier = require('role.carrier');
var roleClaimer = require('role.claimer');
var factory = require('factory');
require('game.helpers');
/*
    1. CLI
    2. Optimize Role Helper and Roles
    3. Reserve Rooms
    4. Multi tool for expanding
    5. Lair Keep
    6. Wall Builder
*/

module.exports.loop = function () {

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
        else if(creep.memory.role == 'wallRepairer'){
            roleWallRepairer.run(creep);
        }
        else if(creep.memory.role == 'claimer'){
            roleClaimer.run(creep);
        }
    }

    factory.run(Game.spawns['Spawn1']);

    var hostiles = Game.rooms["W27N54"].find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in room ${"W27N54"}`);
        var towers = Game.rooms["W27N54"].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }


};