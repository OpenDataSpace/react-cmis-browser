var React = require('react');
var Reflux = require('reflux');
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
            <h3>File Browser</h3>
            <p><a href="" onClick={this.handleBackClick}>Go back</a></p>
            <br/>
            <p><a href="" onClick={this.handleUpdateClick}>Click to update me</a></p>
            <br/>
            <FileList filesList={this.state.filesList} />
            <br/>
        </div>;
    },
    handleUpdateClick: function (evt) {
        evt.preventDefault();
        actions.fileBrowserUpdate();
    },
    handleBackClick: function (evt) {
        evt.preventDefault();
        actions.fileBrowserLoadBack();
    }
});

module.exports = FileBrowser;