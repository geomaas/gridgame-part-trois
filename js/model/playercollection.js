let PlayerModel = require('./playermodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: PlayerModel,
    initialize: function() {
      let serverPlayer = new HighScoreCollection();
      serverPlayer.fetch({
          url: `http://grid.queencityiron.com/api/highscore`,
          success: function () {
            console.log("fetch function worked", serverPlayer);
              // todo: fix `this`
              self.overScreen.model = serverPlayer;
              self.overScreen.render();
          },
      });
    }

});
