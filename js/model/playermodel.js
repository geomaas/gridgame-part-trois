module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    defaults: {
        name: '',
        score: '',
        playerType: '',

    }
});
