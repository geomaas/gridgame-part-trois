// let HighScoreCollection = require('./model/highscorecollection');
// let PlayerCollection = require('./model/playercollection');

module.exports = Backbone.Model.extend({
    // url: 'http://tiny-tiny.herokuapp.com/collections/grid',
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
