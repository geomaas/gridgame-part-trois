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
