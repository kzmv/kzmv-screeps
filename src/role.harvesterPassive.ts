import {creepHelpers} from 'helpers.role';

export const roleHarvesterPassive = {
    run: function (creep: Creep) {
        if(_.sum(creep.carry) == creep.carryCapacity){
            creepHelpers.transferToLink(creep);
        }
        
        creepHelpers.extractFromSource(creep);
    }
};
