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


        this.player = new GameView({
            model: grmodel,
            el: document.getElementById('player-login'),
        });

        this.overScreen = new GameOverView({
            model: grmodel,
            el: document.getElementById('over-screen'),
        });

        grmodel.on('gameOverScreen', function(model) {
            console.log(`${model.get('player')}`);

            this.navigate(`game-over`, {
                trigger: true
            });
        }, this);

        this.player.on('newGame', function(model) {
            console.log('new player entered');

            this.navigate(`player`, {
                trigger: true
            });
        }, this);

        this.grid.on('playGame', function(model) {
            console.log('new game started');

            this.navigate(`grid`, {
                trigger: true
            });
        }, this);

    },

    routes: {
        // url : function
        'game-enter': 'player',
        'game-start': 'grid',
        'game-over': 'overScreen',
        'game-over/:id': 'overScreen',
        // '': 'grid',
        // '': 'player',
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

    overScreen: function (id) {
        // General pattern: 'if you're not supposed to be
        // here, get out'.
        // if (id === null) {
        //     this.navigate('player', { trigger: true });
        //     return;
        // }
        //
        let self = this;

        let serverPlayer = new GridModel();
        serverPlayer.fetch({
            url: `http://grid.queencityiron.com/api/highscore`,
            success: function () {
              console.log("fetch function worked");
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
