
module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/highscore',
    defaults: {
        name: '',
        score: '',
        playerType: '',

    }
});
