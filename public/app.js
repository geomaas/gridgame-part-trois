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

},{"./router":7}],2:[function(require,module,exports){
let HighScoreCollection = require('./highscorecollection');
let PlayerCollection = require('./playercollection');

module.exports = Backbone.Model.extend({
    initialize: function() {

        this.playercollection = new PlayerCollection();
        this.highscore = new HighScoreCollection();
    },
    // Initial value for data that the model is responsible for.
    url: 'http://grid.queencityiron.com/api/highscore',
    defaults: {
        xStart: 0, //horizontal

        yStart: 0, //vertical

        xPowerUp: Math.ceil(Math.random() * 10),

        yPowerUp: Math.ceil(Math.random() * 10),

        moves: 0,

        name: "wah wah",
        playerType: "",
        energyPerMove: "",
        startingEnergy: "",
        powerup: 10,

        size: "",

        score: 0,
    },
    setPowerUp: function() {
        this.get('xPowerUp');
        this.get('yPowerUp');
    },
    addPowerUp: function() {
        this.set('startingEnergy', this.get('startingEnergy') + this.get('powerup'));
    },
    setPlayer: function() {
        console.log("setPlayer function firing");
        // from riggan via luke. thanks to riggan for explanation cus that shit is confusing.
        let target = this.playercollection.find(function(type) {
            return type.get('name') === event.target.textContent;
        });
        // end of lukes stuff
        console.log(target.get('startingEnergy'));
        this.set('name', document.getElementById('player-name').value);
        this.set('playerType', event.target.textContent)
        this.set('startingEnergy', target.get('startingEnergy'));
        this.set('energyPerMove', target.get('energyPerMove'));
        this.set('score', 0);
    },

    pullPlayer: function() {
        console.log("calling to the collection for player");
        this.playercollection.getServerPlayer();

    },
    pullHighScore: function() {
        console.log("calling for high scores from collection");
        this.highscore.getServerScore();

    },

    sendScore: function() {
        this.get('name'),
        this.get('score'),
        this.get('playerType')
        this.save();
        console.log("sending score info");
        // this.highscore.pushScore();
    },

    up: function() {
        // if (this.get('size') === "large") {
        if (this.get('yStart') > 0) {
            this.set('yStart', this.get('yStart') - 1);
            this.set('moves', this.get('moves') + 1);
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
            this.set('score', this.get('moves') * 10);

        }
        if (this.get('startingEnergy') <= 0) {
            console.log("show restart screen");
            // this.set('score', this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            // this.save();
        }
    },

    down: function() {

        if (this.get('yStart') < 9) {
            this.set('yStart', this.get('yStart') + 1);
            this.set('moves', this.get('moves') + 1);
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
            this.set('score', this.get('moves') * 1);

        }
        if (this.get('startingEnergy') <= 0) {
            console.log("show restart screen");
            // this.set('score', this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            // this.save();

        }
    },

    left: function() {

        if (this.get('xStart') > 0) {
            this.set('xStart', this.get('xStart') - 1);
            this.set('moves', this.get('moves') + 1);
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
            this.set('score', this.get('moves') * 10);

        }

        if (this.get('startingEnergy') <= 0) {
            console.log("show restart screen");
            // this.set('score', this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            // this.save();

        }
    },

    right: function() {

        if (this.get('xStart') < 9) {
            this.set('xStart', this.get('xStart') + 1);
            this.set('moves', this.get('moves') + 1);
            this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
            this.set('score', this.get('moves') * 10);

        }

        if (this.get('startingEnergy') <= 0) {
            console.log("show restart screen");
            // this.set('score', this.get('moves') * 10);
            this.trigger('gameOverScreen', this);
            // this.save();
        }
    },

    currentPlayer: function() {
        this.get('player');
    }

});

},{"./highscorecollection":3,"./playercollection":5}],3:[function(require,module,exports){
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
    // pushScore: function() {
    //     console.log("saving score to server");
    //     this.invoke('save');
    // },

});

},{"./highscoremodel":4}],4:[function(require,module,exports){

module.exports = Backbone.Model.extend({
  
    defaults: {
        name: 'test hs',
        score: 'score hs',
        playerType: 'playtype hs',

    }
});

},{}],5:[function(require,module,exports){
let PlayerModel = require('./playermodel');

module.exports = Backbone.Collection.extend({
    url: 'http://grid.queencityiron.com/api/players',
    model: PlayerModel,

    getServerPlayer: function() {
      console.log("start player fetch request");
        let self = this;

        this.fetch({
            success: function() {
                console.log("fetch player function worked");
                self.trigger('newPlayer', this.model);
            },
            failure: function() {
              console.log("you done fucked up the player fetch request");
            },
        });
    }

});

},{"./playermodel":6}],6:[function(require,module,exports){
module.exports = Backbone.Model.extend({

    defaults: {
        name: "weakling",
        energyPerMove: 1,
        startingEnergy: 10,
    }
});

},{}],7:[function(require,module,exports){
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
        console.log('new player screen up from router');
        this.overScreen.el.classList.add('hidden');
        this.grid.el.classList.add('hidden');
        this.player.el.classList.remove('hidden');

    },

    grid: function() {
        console.log('new game screen up from router');
        this.grid.el.classList.remove('hidden');
        this.player.el.classList.add('hidden');
        this.overScreen.el.classList.add('hidden');

    },

    overScreen: function () {
        console.log('restart test');
        this.player.el.classList.add('hidden');
        this.grid.el.classList.add('hidden');
        this.overScreen.el.classList.remove('hidden');
    },
});

},{"./model/gridmodel":2,"./model/highscorecollection":3,"./view/gameoverview":8,"./view/gameview":9,"./view/gridview":10}],8:[function(require,module,exports){
module.exports = Backbone.View.extend({
    // 'Constructor' function - what to do at the beginning
    initialize: function() {
        this.model.on('change', this.render, this); // this as third arg
        this.model.highscore.on('scores', this.render, this);
        console.log('tell model to get score from collection');
        this.model.pullHighScore();
    },

    // Event listeners to set up
    events: {
        // 'event-name selector': 'function-to-call'

        'click #restart': 'restart',
        'click #addScore': 'addscore',
    },

    restart: function() {
        this.trigger('playGame', this.model);
        location.reload();
        console.log("clicked");
    },

    addscore: function() {
      this.model.sendScore();
      location.reload();
    },

    // How to update the DOM when things change
    render: function() {
        // console.log(this.model.get('name'));
        let finalscore = this.el.querySelector('#gameover-score');
        finalscore.textContent = this.model.get('score');

        let finalplayer = this.el.querySelector('#gameover-player');
        finalplayer.textContent = this.model.get('name');

        let finalsize = this.el.querySelector('#gameover-size');
        finalsize.textContent = this.model.get('playerType');

        let things = this.el.querySelector('ul');
        // console.log(things);
        //  things.innerHTML = '';
        this.model.highscore.forEach(function(el) {
            // add an <li> to the list
            let item = document.createElement('li');
            item.textContent = `Name: ${el.get('name')}  Score: ${el.get('score')}`;

            things.appendChild(item);


        });


    },
});

},{}],9:[function(require,module,exports){
module.exports = Backbone.View.extend({
    // 'Constructor' function - what to do at the beginning
    initialize: function() {
        this.model.on('change', this.render, this); // this as third arg
        this.model.playercollection.on('newPlayer', this.render, this);
        console.log('tell model to get players from collection');
        this.model.pullPlayer();
    },

    // Event listeners to set up
    events: {
        // 'event-name selector': 'function-to-call'
        'click .btn': 'enterPlayer',
    },
    enterPlayer: function() {
        this.model.setPlayer();
        this.trigger('newGame', this.model);
        let player = document.getElementById('player-name').value;
    },
    // How to update the DOM when things change
    render: function() {


        // playerinfo.textContent = this.model.get('player');
        // document.getElementById('player-name').value = "";
        let playerinfo = this.el.querySelector('#button-list')
        console.log("rendering buttons on player screen");

        this.model.playercollection.forEach(function(element) {
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-secondary');
            button.textContent = element.get('name');
            button.id = element.get('name');

            let buttonplus = document.getElementsByClassName('button')
                // buttonplus.addClass('btn btn-secondary')
            playerinfo.appendChild(button);
        });
    },
});

},{}],10:[function(require,module,exports){
module.exports = Backbone.View.extend({
    // 'Constructor' function - what to do at the beginning
    initialize: function () {
        this.model.on('change', this.render, this); // this as third arg
        // this.on('powerup',this.resetPowerUp, this);
    },

    // Event listeners to set up
    events: {
        // 'event-name selector': 'function-to-call'
        'click #up': 'clickUp',
        'click #down': 'clickDown',
        'click #left': 'clickLeft',
        'click #right': 'clickRight',
        'powerup' : 'resetPowerUp',

    },

    clickUp: function () {
        this.model.up();
        // console.log("clicked up");
    },

    clickDown: function () {
        this.model.down();
        // console.log("clicked down");
    },

    clickLeft: function () {
        this.model.left();
    },

    clickRight: function () {
        this.model.right();
    },
    resetPowerUp: function() {
      this.model.setPowerUp();
      this.model.addPowerUp();
    },



    // How to update the DOM when things change
    render: function () {
        // let xMove = this.el.querySelector('#horizontal');
        // xMove.textContent = this.model.get('xStart');
        //
        // let yMove = this.el.querySelector('#vertical');
        // yMove.textContent = this.model.get('yStart');

        let movesCounter = this.el.querySelector('#moves');
        movesCounter.textContent = this.model.get('moves')

        let energyCounter = this.el.querySelector('#energy-level')
        energyCounter.textContent = this.model.get('startingEnergy')

        let gridname = this.el.querySelector('#gridname')
        gridname.textContent = this.model.get('name');
        // console.log("testY", this.model.get('name'));

        let gridscore = this.el.querySelector('#score')
        gridscore.textContent = this.model.get('score');

        let grid = this.el.querySelector('#gameboard');
        grid.innerHTML = "";

        // console.log(this.model.get('xStart'));
        let that = this;

        for (var y = 0; y < 10; y++) {
          let rowY = document.createElement('div');
          rowY.classList.add('rowY');

          for (var x = 0; x < 10; x++) {
            let colX = document.createElement('div');
            colX.classList.add('colX');
            if (this.model.get('yStart') === y && this.model.get('xStart') === x) {
              colX.classList.add('player');
            }
            if (this.model.get('yPowerUp') === y && this.model.get('xPowerUp') === x) {
              colX.classList.add('power-up');
            }
            if (this.model.get('yStart') === this.model.get('yPowerUp') && this.model.get('xStart') === this.model.get('xPowerUp')) {
              console.log("powered up!!!");
              // let that = this;
              that.trigger('powerup', this.model)
            }

            rowY.appendChild(colX);
          }
          grid.appendChild(rowY);
        }

    },
});

},{}]},{},[1])