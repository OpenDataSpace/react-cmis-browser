var React = require('react');
var Reflux = require('reflux');
var Auth = require('../Auth/Auth.js');
var FileBrowser = require('../FileBrowser/FileBrowser.js');
var mainStore = require('./mainStore');
var actions = require('../actions');

var Main = React.createClass({
    mixins: [Reflux.listenTo(mainStore,"onMainChange")],
    getInitialState: function() {
        return { isBrowserActive: false };
    },
    onMainChange: function(newState) {
        if (newState.isBrowserActive !== undefined) {
            if (!this.state.isBrowserActive && newState.isBrowserActive === true) {
                actions.fileBrowserLoadRoot();
            }
            this.setState({ isBrowserActive: !!newState.isBrowserActive });
        }
    },
    render: function () {
        return <div className="main">
            <Auth />
            {this.state.isBrowserActive ? <FileBrowser /> : null }
        </div>;
    }
});

module.exports = Main;