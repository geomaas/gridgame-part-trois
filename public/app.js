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
    url:'',
    // Initial value for data that the model is responsible for.
    defaults: {
        xStart: 1, //horizontal

        yStart: 1, //vertical

        player: "default",

        moves: 0,

        largeEnergy: 150,

        smallEngergy: 100,

    },

    up: function() {
        if (this.get('yStart') < 10) {
            this.set('yStart', this.get('yStart') + 1);
            this.set('moves', this.get('moves') + 1);
            this.set('largeEnergy', this.get('largeEnergy') - 20);
        }
        if (this.get('largeEnergy') <= 0) {
          console.log(restartGame);

        }


    },

    down: function() {
        if (this.get('yStart') > 1) {
            this.set('yStart', this.get('yStart') - 1);
            this.set('moves', this.get('moves') + 1);
            this.set('largeEnergy', this.get('largeEnergy') - 20);
        }

    },

    left: function() {
        if (this.get('xStart') > 1) {
            this.set('xStart', this.get('xStart') - 1);
            this.set('moves', this.get('moves') + 1);
            this.set('largeEnergy', this.get('largeEnergy') - 20);
        }

    },

    right: function() {
        if (this.get('xStart') < 10) {
            this.set('xStart', this.get('xStart') + 1);
            this.set('moves', this.get('moves') + 1);
            this.set('largeEnergy', this.get('largeEnergy') - 20);
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
        // this.model.();
        console.log("clicked");
    },

    // How to update the DOM when things change
    render: function () {



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

        'click #player-input': 'enterPlayer'
    },

    enterPlayer: function () {
      let player =  document.getElementById('playerName').value;
      console.log(player);
      console.log("GEFF", document.getElementById('playerName').value);

      this.model.update
    },

    // How to update the DOM when things change
    render: function () {


      let name = this.el.querySelector('#name')
      name.textContent = this.model.get('player');
      // document.getElementById('playerName').value
      document.getElementById('playerName').value = "";

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
        // 'click #playerInput': 'enterPlayer'
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

    // enterPlayer: function () {
    //     this.model.currentPlayer();
    // },

    // How to update the DOM when things change
    render: function () {
        let xMove = this.el.querySelector('#horizontal');
        xMove.textContent = this.model.get('xStart');

        let yMove = this.el.querySelector('#vertical');
        yMove.textContent = this.model.get('yStart');

        let movesCounter = this.el.querySelector('#moves');
        movesCounter.textContent = this.model.get('moves')

        let energyCounter = this.el.querySelector('#energy')
        energyCounter.textContent = this.model.get('largeEnergy')

      

    },
});

},{}]},{},[1])