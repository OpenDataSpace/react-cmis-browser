var React = require('react');
var Reflux = require('reflux');
var Ratchet = require('react-ratchet');
var { NavBar, Title, TableView, TableViewCell } = Ratchet;
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
                <TableViewCell navigateRight>Item 1</TableViewCell>
                <TableViewCell navigateRight>Item 2</TableViewCell>
                <TableViewCell divider>Divider</TableViewCell>
                <TableViewCell navigateRight>Item 3</TableViewCell>
            </TableView>
            <TabBar tabName="settings"/>
        </div>;
    },
    handleLogoutClick() {
        this.context.router.transitionTo('/auth');
    }
});

module.exports = SettingsPage;