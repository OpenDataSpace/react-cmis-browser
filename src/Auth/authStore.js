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
        if (window.localStorage) {
            var credentials = localStorage.getItem('credentials');
        }
        if (credentials) {
            actions.createSession(JSON.parse(credentials));
        }
    },
    onCreateSession: function (credentials) {
        app.cmisConnector.createSession(credentials,
            actions.createSession.sessionCreated.bind(this, app.cmisConnector.session, credentials),
            actions.createSession.sessionFailed);
    },
    onSessionCreated: function(session, credentials) {
        this.session = session;
        console.log('session created');
        this.trigger('success', credentials.username);
        // TODO: Only for development purposes!!!!!!!!
        if (window.localStorage) {
            localStorage.setItem('credentials', JSON.stringify(credentials));
        }
    },
    onSessionFailed: function(exc) {
        this.trigger('failure', "", exc);
    }
});

module.exports = authStore;