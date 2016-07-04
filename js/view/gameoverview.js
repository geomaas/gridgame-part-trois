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
