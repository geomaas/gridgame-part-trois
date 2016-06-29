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
        // this.model.();
        console.log("clicked");
    },

    // How to update the DOM when things change
    render: function () {



    },
});
