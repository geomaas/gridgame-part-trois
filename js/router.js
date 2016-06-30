let GridModel = require('./model/gridmodel');

///// login page
let GridView = require('./view/gridview');
let GameView = require('./view/gameview');
let GameOverView = require('./view/gameoverview');
let HighScoreCollection = require('./model/highscorecollection');
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


        this.player = new GameView({
            model: grmodel,
            el: document.getElementById('player-login'),
        });

        this.overScreen = new GameOverView({
            model: grmodel,
            el: document.getElementById('over-screen'),
        });

        grmodel.on('gameOverScreen', function(model) {
            console.log("restarted game");

            this.navigate(`game-over`, {
                trigger: true
            });
        }, this);
        //
        this.player.on('newGame', function(model) {
            console.log('new player entered');

            this.navigate(`game-start`, {
                trigger: true
            });
        }, this);
        //
        this.overScreen.on('playGame', function(model) {
            console.log('new game started');

            this.navigate(`game-enter`, {
                trigger: true
            });
        }, this);

    },

    routes: {
        // url : function
        'game-enter': 'player',
        'game-start': 'grid',
        'game-over': 'overScreen',
        // 'game-over/:id': 'overScreen',
        '': 'player',
    },
    player: function() {
        console.log('new player screen up');
        this.overScreen.el.classList.add('hidden');
        this.grid.el.classList.add('hidden');
        this.player.el.classList.remove('hidden');

    },

    grid: function() {
        console.log('new game screen up');
        this.grid.el.classList.remove('hidden');
        this.player.el.classList.add('hidden');
        this.overScreen.el.classList.add('hidden');

    },

    overScreen: function () {
        // General pattern: 'if you're not supposed to be
        // here, get out'.
        // if (id === null) {
        //     this.navigate('player', { trigger: true });
        //     return;
        // }
        //
        let self = this;

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
        console.log('restart test');
        this.player.el.classList.add('hidden');
        this.grid.el.classList.add('hidden');
        this.overScreen.el.classList.remove('hidden');
    },
});
