var React = require('react');
var Reflux = require('reflux');
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
                <div>
                    <form onSubmit={this.handleEnter}>
                        <label htmlFor="username">Username:</label>
                        <input id="username" type="text" autoFocus onKeyUp={this.handleValueChange} />
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" onKeyUp={this.handleValueChange} />
                        <button type="submit">Enter</button>
                        <div>{this.state.errorMessage}</div>
                    </form>
                </div>
            )
        }
        else {
            return <div><h4>Hello, {this.state.username}!</h4></div>;
        }
    },
    handleValueChange: function(evt) {
        var text = evt.target.value;
        if (evt.which === 13 && text) {

        }
    },
    handleEnter: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var username = evt.target.username.value || "";
        var password = evt.target.password.value || "";
        if (username.trim().length > 0 && password.trim().length > 0) {
            actions.createSession({username: username, password: password});
        }
    }
});

module.exports = AuthComponent;