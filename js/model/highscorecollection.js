let HighScore = require('./highscoremodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    model: HighScore,
    initialize: function() {

    },

});
