
let GridModel = require('./model/gridmodel');


///// login page
let GridView = require('./view/gridview');
let GameView = require('./view/gameview');
let GameOverView = require ('./view/gameoverview');
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

        this.over = new GameOverView({
            model: grmodel,
            el: document.getElementById('over-screen'),
        });
    },

    routes: {
        // url : function
        'game-start': 'player',
        'game-start': 'grid',
        'game-over': 'restartGame',
        '': 'grid',
        '': 'player',
    },

    // newgame: function () {
    //     console.log('making a new food');
    //     // make the add view show up
    //     this.addView.el.classList.remove('hidden');
    //     // make the list view hide
    //     this.listView.el.classList.add('hidden');
    // },
    //
    restartGame: function () {
        console.log('restart test');
        // make the add view show up
        this.player.el.classList.remove('hidden');
        this.grid.el.classList.remove('hidden');
        // make the list view hide
        this.over.el.classList.add('hidden');
    },
});
