/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('civilian.factory');
 * mod.thing == 'a thing'; // true
 */
import { roles, CreepRole } from 'roles';
var _ = require('lodash');


export const factory = {
    run: (spawner: StructureSpawn) => {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var prioritisedRoles: CreepRole[] = _.sortBy(roles, (role: CreepRole) => role.priority)
        prioritisedRoles = _.filter(prioritisedRoles, (role: CreepRole) => _.filter(Game.creeps, (creep: Creep) => creep.memory.id == role.id).length < role.count)
        var role: CreepRole = prioritisedRoles[0];
        if (role) {
            var newName: string = role.name + Game.time;
            var template = generateTemplate(role.template);
            var dryRun = spawner.spawnCreep(template, newName, { dryRun: true })
            if (dryRun === 0) {
                console.log('Spawning new ' + role.type + ': ' + newName);
                var memory: CreepMemory = {
                    role: role.type,
                    sourceId: undefined,
                    working: true,
                    targetRoom: role.targetRoom,
                    home: spawner.room.name,
                    id: role.id,
                    name: newName
                }
                console.log('Memory: ' + memory);
                console.log('Template: ' + template);
                spawner.spawnCreep(template, newName,
                    { memory: memory });
                console.log("Next in queue: " + role.type)
                console.log("Priority queue: " + prioritisedRoles.map(r => r.name));

            }
        }

        if (spawner.spawning) {
            var spawningCreep = Game.creeps[spawner.spawning.name];
            spawner.room.visual.text(
                'Building: ' + spawningCreep.memory.id,
                spawner.pos.x + 1,
                spawner.pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
}

export const generateTemplate = (templateMap: any): BodyPartConstant[] => {
    const bodyParts = Object.keys(templateMap);
    let template: any[] = [];
    for(let part of bodyParts){
        let bodyArr = [];
        for(let i=0;i< templateMap[part];i++){
            bodyArr.push(part);
            BODYPARTS_ALL
        }
        template = [...template, ...bodyArr];
    }
    return template;
}