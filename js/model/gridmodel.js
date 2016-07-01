let HighScoreCollection = require('./highscorecollection');
let PlayerCollection = require('./playercollection');

module.exports = Backbone.Model.extend({
    initialize: function () {

      this.playercollection = new PlayerCollection();
    },
    // Initial value for data that the model is responsible for.
    defaults: {
        xStart: 0, //horizontal

        yStart: 0, //vertical

        xPowerUp: Math.ceil(Math.random() * 10),

        yPowerUp: Math.ceil(Math.random() * 10),

        moves: 0,

        player: "",
        playerType: "",
        energyPerMove:"",
        startingEnergy:"",

        size: "",

        energy: 100,

        score: 0,
    },
    // updatePlayer: function(player, size, energy) {
    //     this.set('player', player);
    //     this.set('size', size);
    //     this.set('energy', energy);
    //     // this.get('moves');
    //     console.log("model", player, size, energy);

        // this.save();
        // this.save(undefined, {
        //     success: function() {
        //         console.log("hooray!")
        //     },
        //     error: function() {
        //         console.error('boooo no save');
        //     },
        // });
    // },
    setPlayer: function() {
      console.log("setPlayer function firing");
        // from riggan via luke. thanks to riggan for explanation cus that shit is confusing.
        let target = this.playercollection.find(function(type) {
            return type.get('name') === event.target.textContent;
        });
        // end of lukes stuff
        console.log(target.get('startingEnergy'));
        this.set('name', document.getElementById('name').value);
        this.set('playerType', event.target.textContent)
        this.set('startingEnergy',  target.get('startingEnergy'));
        this.set('energyPerMove', target.get('energyPerMove'));
        this.set('score', 0);
    },

    pullPlayer: function() {
      console.log("calling to the collection for info");
      // console.log(this.playercollection.get('getServerPlayer'));
      this.playercollection.getServerPlayer();

    },
    up: function() {
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

    down: function() {
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
