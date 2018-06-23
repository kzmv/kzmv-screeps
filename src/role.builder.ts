import {creepHelpers} from 'helpers.role';
import {roleUpgrader} from 'role.upgrader';

export const roleBuilder = {
    run: function (creep: Creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working) {
            var constructionSite: ConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {
                creepHelpers.extractFromContainer(creep);
        
        }
    }
}
    