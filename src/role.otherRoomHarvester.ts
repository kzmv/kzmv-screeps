import {creepHelpers} from 'helpers.role';

export const roleORHarvester = {
    run: (creep: Creep) => {
        creepHelpers.isWorking(creep)
        creepHelpers.exitMove(creep);

        if (creep.memory.working) {
            if (creep.room.name == creep.memory.home) {

                creepHelpers.transferToContainer(creep);
            }
            else {
                var constructionSite: ConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                var repairStructure: AnyStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL  && s.structureType != STRUCTURE_RAMPART
                });
                
                if (constructionSite) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
                else if(repairStructure){
                    if(creep.repair(repairStructure) == ERR_NOT_IN_RANGE){
                        creep.moveTo(repairStructure);
                    }
                }
                else {
                    var exit:any = creep.room.findExitTo(creep.memory.home);
                    creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: '#ffaa00' } });
                }
                
            }
        }
        else {
            if (creep.room.name == creep.memory.targetRoom) {
                creepHelpers.extractFromSource(creep);
            }
            else {
                var exit: any = creep.room.findExitTo(creep.memory.targetRoom as string);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};