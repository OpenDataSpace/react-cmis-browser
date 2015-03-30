var Reflux = require('reflux');
var app = require('../app');
var actions = require('../actions');

var authStore = Reflux.createStore({
    session: undefined,
    init: function () {
        this.listenTo(actions.createSession, this.onCreateSession);
        this.listenTo(actions.createSession.sessionCreated, this.onSessionCreated);
        this.listenTo(actions.createSession.sessionFailed, this.onSessionFailed);
        // TODO: Only for development purposes!!!!!!!!
        var credentials = localStorage.getItem('credentials');
        if (credentials) {
            actions.createSession(JSON.parse(credentials));
        }
    },
    onCreateSession: function (credentials) {
        app.cmisConnector.createSession(credentials, function success() {
            // TODO: Only for development purposes!!!!!!!!
            localStorage.setItem('credentials', JSON.stringify(credentials));
            //
            actions.createSession.sessionCreated(app.cmisConnector.session, credentials.username);
        }.bind(this), function error() {
            actions.createSession.sessionFailed();
        }.bind(this));
    },
    onSessionCreated: function(session, username) {
        this.session = session;
        localStorage.setItem('cmisConnector', JSON.stringify(app.cmisConnector));
        console.log('session created');
        this.trigger('success', username);
    },
    onSessionFailed: function() {
        this.trigger('failure', "", "Unable to login. Invalid login or password");
    }
});

module.exports = authStore;