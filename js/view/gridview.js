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
