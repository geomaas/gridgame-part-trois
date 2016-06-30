let GridModel = require('./gridmodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players'
    model: GridModel,
    initialize: function() {

    }

});
