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
            this.context.router.transitionTo('/fileBrowser');
        }
    },
    render() {
        var name = this.context.router.getCurrentPath(); // ===  ;
        name = (name === '/' ? '/auth' : name);
        return <div className="main">
            <div>
                <ul>
                    <li><Link to="auth">Auth</Link></li>
                    <li><Link to="uploader">Uploader</Link></li>
                    <li><Link to="fileBrowser">FileBrowser</Link></li>
                </ul>
                <RouteHandler key={name}/>
            </div>
        </div>;
    }
});

module.exports = Main;