let GridModel = require('./model/gridmodel');


///// login page
let GridView = require('./view/gridview');
let GameView = require('./view/gameview');
let GameOverView = require('./view/gameoverview');
module.exports = Backbone.Router.extend({
    initialize: function() {
        // Models roll on their own.
        let grmodel = new GridModel();

        // Views like company. They need to know two things:
        //    1. What data do I care about?
        //    2. What DOM elements should I be updating when things change?
        this.grid = new GridView({
            model: grmodel,
            el: document.getElementById('position'),
        });
        // let login = new GameModel();

        this.player = new GameView({
            model: grmodel,
            el: document.getElementById('player-login'),
        });

        this.overScreen = new GameOverView({
            model: grmodel,
            el: document.getElementById('over-screen'),
        });

        grmodel.on('restart', function(model) {
            console.log(`${model.get('player')}`);

            this.navigate(`game-over`, {
                trigger: true
            });
        }, this);
    
    },

    routes: {
        // url : function
        'game-start': 'player',
        'game-start': 'grid',
        'game-over': 'overScreen',
        '': 'grid',
        '': 'player',
    },


    overScreen: function() {
        console.log('restart test');
        // make the add view show up
        this.player.el.classList.add('hidden');
        this.grid.el.classList.add('hidden');
        // make the list view hide
        this.overScreen.el.classList.remove('hidden');
    },
});
