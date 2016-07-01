let PlayerModel = require('./playermodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: PlayerModel,

    getServerPlayer: function() {
      console.log("start player fetch request");
        let self = this;

        this.fetch({
            success: function() {
                console.log("fetch player function worked");
                self.trigger('newPlayer', this.model);
            },
            failure: function() {
              console.log("you done fucked up the player fetch request");
            },
        });
    }

});
