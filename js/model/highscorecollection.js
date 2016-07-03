let HighScore = require('./highscoremodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScore,

    getServerScore: function() {
      console.log("start high score fetch request");
        let self = this;

        this.fetch({
            success: function() {
                console.log("fetch score function worked");
                self.trigger('scores', this.model);
            },
            failure: function() {
              console.log("you done fucked up the score fetch request");
            },
        });
    },
    pushScore: function() {
      self.save();
      console.log("saving score to server");
    },

});
