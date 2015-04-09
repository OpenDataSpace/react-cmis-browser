var React = require('react');
var Reflux = require('reflux');
var Ratchet = require('react-ratchet');
var { Button } = Ratchet;
var actions = require('../actions');
var authStore = require('./authStore');

var AuthComponent = React.createClass({
    mixins: [Reflux.listenTo(authStore,"onAuthChange")],
    getInitialState: function() {
        return { showForm: true, username: "", errorMessage: "" };
    },
    onAuthChange: function(status, username, errorMessage) {
        this.setState({
            showForm: status !== 'success',
            username: username,
            errorMessage: errorMessage
        });
    },
    render: function () {
        if (this.state.showForm) {
            return (
                <div className="authPage">
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" autoFocus
                        onChange={(evt) => this.setState({username: evt.target.value})}/>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password"
                        onChange={(evt) => this.setState({password: evt.target.value})}/>
                    <label>&nbsp;</label>
                    <Button block outlined rStyle="positive" onClick={this.handleEnter}>Login</Button>
                    <div>{this.state.errorMessage}</div>
                </div>
            )
        }
        else {
            return <div><h4>Hello, {this.state.username}!</h4></div>;
        }
    },
    handleEnter: function() {
        if (this.state.username.trim().length > 0 && this.state.password.trim().length > 0) {
            actions.createSession({username: this.state.username, password: this.state.password});
        }
    }
});

module.exports = AuthComponent;