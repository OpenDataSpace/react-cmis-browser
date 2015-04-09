var React = require('react');
var Reflux = require('reflux');
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title } = Ratchet;
var Flow = require('../lib/flowjs-cmis');
var uploaderStore = require('./uploaderStore');
var actions = require('../actions');
var UploaderItem = require('./UploaderItem');
var app = require('../app');

var Uploader = React.createClass({
    mixins: [Reflux.connect(uploaderStore, "items"), Reflux.listenTo(uploaderStore,"onItemsChange")],
    flow: undefined,
    contextTypes: {
        router: React.PropTypes.func
    },
    onItemsChange: function (items) {
        this.setState({ itemsCount: items.length });
    },
    getInitialState: function() {
        return { itemsCount: 0, backTitle: this.props.backTitle };
    },
    componentDidMount: function() {
        var component = React.findDOMNode(this);
        var addFileButton = component.getElementsByClassName('uploader-add-file')[0];
        this.initializeFlow(addFileButton);
    },
    render: function () {
        var uploaderItems = this.state.items.map(function (item) {
            return <UploaderItem item={item} key={item.key}></UploaderItem>
        });
        return <div className="uploader">
            <NavBar>
                <NavButton left onClick={this.handleBackClick}>{this.state.backTitle}</NavButton>
                <NavButton right icon={false} onClick={this.handleStartUploadClick}>Start</NavButton>
                <Title>Upload files</Title>
            </NavBar>
            <h3>Uploader</h3>
            <button className="uploader-add-file">Add file</button>
            <div className="uploaderList">
                {uploaderItems}
            </div>
            <div className="counter">{this.state.itemsCount} files</div>
        </div>;
    },
    handleBackClick() {
        this.context.router.goBack();
    },
    handleStartUploadClick: function () {
        this.flow.upload();
    },
    initializeFlow: function(addFileButton) {
        this.flow = new Flow({
            maxChunkRetries: 1,
            chunkRetryInterval: 5000,
            cmisConnector: app.cmisConnector,
            chunkSize: 1024 * 8192
        });
        this.flow.on('catchAll', function (event) { console.log('catchAll', arguments); });
        this.flow.on('fileAdded', function(file){
            actions.uploaderAddFile(file);
        });
        this.flow.on('complete', function() {
            actions.fileBrowserReload();
            actions.uploaderClearFiles();
        });
        this.flow.assignBrowse(addFileButton);
    }
});

module.exports = Uploader;