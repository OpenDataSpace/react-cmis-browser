var Reflux = require('reflux');
var actions = require('../actions');

var mainStore = Reflux.createStore({
    init: function () {
        this.listenTo(actions.createSession.sessionCreated, this.onSessionCreated);
        this.listenTo(actions.createSession.sessionFailed, this.onSessionFailed);
    },
    onSessionCreated: function() {
        this.trigger({isBrowserActive: true});
    },
    onSessionFailed: function() {
        this.trigger({isBrowserActive: false});
    }
});

module.exports = mainStore;