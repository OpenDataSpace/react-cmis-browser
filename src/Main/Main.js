var React = require('react');
var Reflux = require('reflux');
var Auth = require('../Auth/Auth.js');
var FileBrowser = require('../FileBrowser/FileBrowser.js');
var Uploader = require('../Uploader/Uploader.js');
var mainStore = require('./mainStore');
var actions = require('../actions');

var Main = React.createClass({
    mixins: [Reflux.listenTo(mainStore,"onMainChange")],
    getInitialState: function() {
        return { isBrowserActive: false, isUploaderActive: false, isUploaderButtonActive: false, uploaderButtonText: "Upload files" };
    },
    onMainChange: function(newState) {
        if (!this.state.isBrowserActive && newState.isBrowserActive === true) {
            actions.fileBrowserLoadRoot();
        }
        this.setState(newState);
    },
    render: function () {
        return <div className="main">
            <Auth />
            {this.state.isUploaderButtonActive ? <button onClick={this.toggleUploaderClick}>{this.state.uploaderButtonText}</button> : null}
            {this.state.isUploaderActive ? <Uploader /> : null }
            {this.state.isBrowserActive ? <FileBrowser /> : null }
        </div>;
    },
    toggleUploaderClick: function() {
        var uploaderButtonText = this.state.isUploaderActive ? "Upload files" : "Hide File Uploader";
        this.setState({isUploaderActive: !this.state.isUploaderActive, uploaderButtonText: uploaderButtonText});
    }
});

module.exports = Main;