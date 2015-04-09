var React = require('react');
var Reflux = require('reflux');
var Ratchet = require('react-ratchet');
var { NavBar, Title, TableView, TableViewCell, Button } = Ratchet;
var TabBar = require('../FileBrowser/TabBar');
var actions = require('../actions');

var SettingsPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render () {
        return <div className="settingsPage">
            <NavBar>
                <Title>Settings</Title>
            </NavBar>
            <TableView>
                <TableViewCell></TableViewCell>
                <Button block outlined rStyle="negative" onClick={this.handleLogoutClick}>Logout</Button>
            </TableView>
            <TabBar tabName="settings"/>
        </div>;
    },
    handleLogoutClick() {
        this.context.router.transitionTo('/auth');
        actions.authLogout();
    }
});

module.exports = SettingsPage;