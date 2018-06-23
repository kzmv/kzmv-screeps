import {creepHelpers} from 'helpers.role';

export const roleHarvesterPassive = {
    run: function (creep: Creep) {
        creepHelpers.extractFromSource(creep);
    }
};
