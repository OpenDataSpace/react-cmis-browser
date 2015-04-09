var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView } = Ratchet;
var FileList = require('./FileList');
var TabBar = require('./TabBar');
var actions = require('../actions');
var fileBrowserStore = require('./fileBrowserStore');

var FileBrowser = React.createClass({
    mixins: [Reflux.connect(fileBrowserStore, "filesList"), Reflux.listenTo(fileBrowserStore,"onFilesChange")],
    componentDidMount() {
        actions.fileBrowserUpdateState();
    },
    onFilesChange: function (files, state) {
        console.log('files changed');
        this.setState(state);
    },
    render: function () {
        return <div className="fileBrowser">
            <NavBar>
                {this.state.backTitle ? <NavButton left onClick={this.handleBackClick}>{this.state.backTitle}</NavButton> : null}
                {this.state.repositoryName === 'my' ? <NavButton right icon={false}><Link to="uploader">Upload file</Link></NavButton> : null }
                <Title>{this.state.mainTitle}</Title>
            </NavBar>
            <TableView>
                <FileList filesList={this.state.filesList} />
            </TableView>
            <TabBar tabName={this.state.repositoryName}/>
        </div>;
    },
    handleUpdateClick: function (evt) {
        evt.preventDefault();
        actions.fileBrowserReload();
    },
    handleBackClick: function (evt) {
        evt.preventDefault();
        actions.fileBrowserLoadBack();
    }
});

module.exports = FileBrowser;