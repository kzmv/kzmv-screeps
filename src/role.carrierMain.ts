import { creepHelpers } from 'helpers.role';
var _ = require('lodash');

export const roleCarrierMain = {
    run: function (creep: Creep) {
        creepHelpers.isWorking(creep);

        if (creep.memory.working) {
            creepHelpers.transferToSpawn(creep);
        }
        else {
            creepHelpers.extractFromStorage(creep)
        }
    }
};