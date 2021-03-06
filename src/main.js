// import modules
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleCarrier = require('role.carrier');
var roleClaimer = require('role.claimer');
var roleORHarvester = require('role.otherRoomHarvester');
var roleORUpgrader = require('role.otherRoomUpgrader');
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
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if (creep.memory.role == 'otherRoomHarvester') {
            roleORHarvester.run(creep);
        }
        else if (creep.memory.role == 'otherRoomUpgrader') {
            roleORUpgrader.run(creep);
        }
    }


    for (var roomName of Object.keys(Game.rooms)) {
        var room = Game.rooms[roomName];
        var spawn = room.find(FIND_MY_SPAWNS)[0]
        if(spawn){
            factory.run(room.find(FIND_MY_SPAWNS)[0]);
        }
        

        var hostiles = room.find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            var towers = room.find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }


};