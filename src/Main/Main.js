var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var mainStore = require('./mainStore');
var actions = require('../actions');

var Main = React.createClass({
    mixins: [Reflux.listenTo(mainStore,"onMainChange")],
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState: function() {
        return { loggedIn: false };
    },
    onMainChange(state) {
        this.setState(state);
        if (state.loggedIn) {
            actions.fileBrowserOpenRepository();
            this.context.router.transitionTo('/fileBrowser');
        }
    },
    render() {
        return <div className="main">
            <RouteHandler />
        </div>;
    }
});

module.exports = Main;