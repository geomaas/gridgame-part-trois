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
