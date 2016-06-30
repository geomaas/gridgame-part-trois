let GridModel = require('./gridmodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore'
    model: GridModel,
    initialize: function() {
      
    }

});
