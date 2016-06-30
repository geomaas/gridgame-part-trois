(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// let GridModel = require('./model/gridmodel');
// let GridView = require('./view/gridview');
//
// ///// login page
// // let GameModel = require('./model/gamemodel');
// let GameView = require('./view/gameview');
//
// window.addEventListener('load', function() {
//     // Models roll on their own.
//     let grmodel = new GridModel();
//
//     // Views like company. They need to know two things:
//     //    1. What data do I care about?
//     //    2. What DOM elements should I be updating when things change?
//     let grid = new GridView({
//         model: grmodel,
//         el: document.getElementById('position'),
//     });
//     // let login = new GameModel();
//
//     let player = new GameView({
//             model: grmodel,
//             el: document.getElementById('player-login'),
//         });
//         console.log();
// });

let AppRouter = require('./router');

// Get this show on the road.
// app.js is a humble file.
window.addEventListener('load', function () {
    let router = new AppRouter();
    Backbone.history.start();
});

},{"./router":3}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({
    url: 'http://tiny-tiny.herokuapp.com/collections/grid',
    // Initial value for data that the model is responsible for.
    defaults: {
        xStart: 1, //horizontal

        yStart: 1, //vertical

        moves: 0,

        player: "",

        size: "",

        energy: 100,

        score: 0,
    },
    updatePlayer: function(player, size, energy) {
        this.set('player', player);
        this.set('size', size);
        this.set('energy', energy);
        // this.get('moves');
        console.log("model", player, size, energy);

        // this.save();
        // this.save(undefined, {
        //     success: function() {
        //         console.log("hooray!")
        //     },
        //     error: function() {
        //         console.error('boooo no save');
        //     },
        // });
    },
    up: function() {
        if (this.get('size') === "large") {
            if (this.get('yStart') < 10) {
                this.set('yStart', this.get('yStart') + 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 20);
            }
        } else if (this.get('size') === "small") {
            if (this.get('yStart') < 10) {
                this.set('yStart', this.get('yStart') + 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 10);
            }

        }
        if (this.get('energy') <= 0) {
            console.log("show restart screen");
            this.set('score',this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            this.save();
        }
    },

    down: function() {
        if (this.get('size') === "large") {
            if (this.get('yStart') > 1) {
                this.set('yStart', this.get('yStart') - 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 20);
            }
        } else if (this.get('size') === "small") {
            if (this.get('yStart') > 1) {
                this.set('yStart', this.get('yStart') - 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 10);
            }
        }
        if (this.get('energy') <= 0) {
            console.log("show restart screen");
            this.set('score',this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            this.save();

        }
    },

    left: function() {
        if (this.get('size') === "large") {
            if (this.get('xStart') > 1) {
                this.set('xStart', this.get('xStart') - 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 20);
            }
        } else if (this.get('size') === "small") {
            if (this.get('xStart') > 1) {
                this.set('xStart', this.get('xStart') - 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 10);
            }
        }
        if (this.get('energy') <= 0) {
            console.log("show restart screen");
            this.set('score',this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            this.save();

        }
    },

    right: function() {
        if (this.get('size') === "large") {
            if (this.get('xStart') < 10) {
                this.set('xStart', this.get('xStart') + 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 20);
            }
        } else if (this.get('size') === "small") {
            if (this.get('xStart') < 10) {
                this.set('xStart', this.get('xStart') + 1);
                this.set('moves', this.get('moves') + 1);
                this.set('energy', this.get('energy') - 10);
            }
        }
        if (this.get('energy') <= 0) {
            console.log("show restart screen");
            this.set('score',this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            this.save();
        }
    },

    currentPlayer: function() {
        this.get('player');
    }

});

},{}],3:[function(require,module,exports){
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

            this.navigate(`grid`, {
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

},{"./model/gridmodel":2,"./view/gameoverview":4,"./view/gameview":5,"./view/gridview":6}],4:[function(require,module,exports){
module.exports = Backbone.View.extend({
    // 'Constructor' function - what to do at the beginning
    initialize: function () {
        this.model.on('change', this.render, this); // this as third arg
    },

    // Event listeners to set up
    events: {
        // 'event-name selector': 'function-to-call'

        'click #restart': 'restart'
    },

    restart: function () {
      this.trigger('newGame', this.model);
        console.log("clicked");
    },

    // How to update the DOM when things change
    render: function () {

      let finalscore = this.el.querySelector('#gameover-score');
      finalscore.textContent = this.model.get('score');

      let finalplayer = this.el.querySelector('#gameover-player');
      finalplayer.textContent = this.model.get('name');

      let finalsize = this.el.querySelector('#gameover-size');
      finalsize.textContent = this.model.get('size');




    },
});

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
    // 'Constructor' function - what to do at the beginning
    initialize: function () {
        this.model.on('change', this.render, this); // this as third arg
    },

    // Event listeners to set up
    events: {
        // 'event-name selector': 'function-to-call'

        'click #large-start': 'largeEnterPlayer',
        'click #small-start': 'smallEnterPlayer',
    },

    largeEnterPlayer: function () {
      let player =  document.getElementById('player-name').value;
      let size = "large"
      let energy = 150
      // console.log("view", size);
      this.model.updatePlayer(player, size, energy);
      this.trigger('newGame', this.model);
    },
    smallEnterPlayer: function () {
      let player =  document.getElementById('player-name').value;
      let size = "small"
      let energy = 100
      // console.log("view", size);
      this.model.updatePlayer(player, size, energy);
      this.trigger('newGame', this.model);

    },
    // How to update the DOM when things change
    render: function () {


      let name = this.el.querySelector('#name')
      name.textContent = this.model.get('player');
      // document.getElementById('playerName').value
      document.getElementById('player-name').value = "";

        // let song = this.el.querySelector('#current-song');
        // // song.textContent = this.model.currentSong();
        // song.innerHTML = `The song is ${this.model.currentSong()}`;
    },
});

},{}],6:[function(require,module,exports){
module.exports = Backbone.View.extend({
    // 'Constructor' function - what to do at the beginning
    initialize: function () {
        this.model.on('change', this.render, this); // this as third arg
    },

    // Event listeners to set up
    events: {
        // 'event-name selector': 'function-to-call'
        'click #up': 'clickUp',
        'click #down': 'clickDown',
        'click #left': 'clickLeft',
        'click #right': 'clickRight',
    },

    clickUp: function () {
        this.model.up();
        console.log();
    },

    clickDown: function () {
        this.model.down();
    },

    clickLeft: function () {
        this.model.left();
    },

    clickRight: function () {
        this.model.right();
    },



    // How to update the DOM when things change
    render: function () {
        let xMove = this.el.querySelector('#horizontal');
        xMove.textContent = this.model.get('xStart');

        let yMove = this.el.querySelector('#vertical');
        yMove.textContent = this.model.get('yStart');

        let movesCounter = this.el.querySelector('#moves');
        movesCounter.textContent = this.model.get('moves')

        let energyCounter = this.el.querySelector('#energy-level')
        energyCounter.textContent = this.model.get('energy')

        let gridname = this.el.querySelector('#gridname')
        name.textContent = this.model.get('player');



    },
});

},{}]},{},[1])