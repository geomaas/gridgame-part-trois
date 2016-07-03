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
        console.log("clicked up");
    },

    clickDown: function () {
        this.model.down();
        console.log("clicked down");
    },

    clickLeft: function () {
        this.model.left();
    },

    clickRight: function () {
        this.model.right();
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
        name.textContent = this.model.get('player');
        console.log("testY", this.model.get('player'));

        let grid = this.el.querySelector('#gameboard');
        grid.innerHTML = "";

        console.log(this.model.get('xStart'));

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

            rowY.appendChild(colX);
          }
          grid.appendChild(rowY);
        }

    },
});
