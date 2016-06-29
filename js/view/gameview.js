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
