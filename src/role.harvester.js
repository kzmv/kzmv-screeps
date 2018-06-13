var helper = require('role.helpers');

module.exports = {
    run: function(creep) {

        // if (creep.memory.working) {
        //     helper.transferToContainer(creep);
        // } 
        // else {
        //     helper.extractFromSource(creep);
        // }
        helper.extractFromSource(creep);
    }
};