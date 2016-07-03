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

        // 'click #large-start': 'largeEnterPlayer',
        // 'click #small-start': 'smallEnterPlayer',
        'click .btn': 'enterPlayer',
    },
    enterPlayer: function() {
        this.model.setPlayer();
        this.trigger('newGame', this.model);
        let player = document.getElementById('player-name').value;
    },

    // largeEnterPlayer: function() {
    //     let player = document.getElementById('player-name').value;
    //     let size = "large"
    //     let energy = 150
    //         // console.log("view", size);
    //     this.model.updatePlayer(player, size, energy);
    //     this.trigger('newGame', this.model);
    // },
    // smallEnterPlayer: function() {
    //     let player = document.getElementById('player-name').value;
    //     let size = "small"
    //     let energy = 100
    //         // console.log("view", size);
    //     this.model.updatePlayer(player, size, energy);
    //     this.trigger('newGame', this.model);
    //
    // },
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
