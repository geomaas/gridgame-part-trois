// let GridModel = require('./model/gridmodel');
// let GridView = require('./view/gridview');
//
// ///// login page
// // let GameModel = require('./model/gamemodel');
// let GameView = require('./view/gameview');
//
// window.addEventListener('load', function() {
//     // Models roll on their own.
//     let grmodel = new GridModel();
//
//     // Views like company. They need to know two things:
//     //    1. What data do I care about?
//     //    2. What DOM elements should I be updating when things change?
//     let grid = new GridView({
//         model: grmodel,
//         el: document.getElementById('position'),
//     });
//     // let login = new GameModel();
//
//     let player = new GameView({
//             model: grmodel,
//             el: document.getElementById('player-login'),
//         });
//         console.log();
// });

let AppRouter = require('./router');

// Get this show on the road.
// app.js is a humble file.
window.addEventListener('load', function () {
    let router = new AppRouter();
    Backbone.history.start();
});
