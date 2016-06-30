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
      this.trigger('newGame', this.model);
        console.log("clicked");
    },

    // How to update the DOM when things change
    render: function () {

      let finalscore = this.el.querySelector('#gameover-score');
      finalscore.textContent = this.model.get('score');

      let finalplayer = this.el.querySelector('#gameover-player');
      finalplayer.textContent = this.model.get('name');

      let finalsize = this.el.querySelector('#gameover-size');
      finalsize.textContent = this.model.get('size');




    },
});
