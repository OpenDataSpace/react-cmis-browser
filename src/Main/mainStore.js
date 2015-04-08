var Reflux = require('reflux');
var actions = require('../actions');

var mainStore = Reflux.createStore({
    init: function () {
        this.listenTo(actions.createSession.sessionCreated, this.onSessionCreated);
        this.listenTo(actions.createSession.sessionFailed, this.onSessionFailed);
    },
    onSessionCreated: function() {
        this.trigger({loggedIn: true});
    },
    onSessionFailed: function() {
        this.trigger({loggedIn: false});
    }
});

module.exports = mainStore;