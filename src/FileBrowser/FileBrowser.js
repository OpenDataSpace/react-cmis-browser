var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title } = Ratchet;
var FileList = require('./FileList');
var actions = require('../actions');
var fileBrowserStore = require('./fileBrowserStore');

var FileBrowser = React.createClass({
    mixins: [Reflux.connect(fileBrowserStore, "filesList"), Reflux.listenTo(fileBrowserStore,"onFilesChange")],
    onFilesChange: function () {
        console.log('something changed!!');
    },
    render: function () {
        return <div className="fileBrowser">
            <NavBar>
                <NavButton left>Left</NavButton>
                <NavButton right>Right</NavButton>
                <Title>Title</Title>
            </NavBar>

            <h3>File Browser</h3>
            <Link to="uploader">Uploader</Link>
            <p><a href="" onClick={this.handleBackClick}>Go back</a></p>
            <br/>
            <FileList filesList={this.state.filesList} />
            <br/>
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