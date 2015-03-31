var React = require('react');
var Reflux = require('reflux');
var Flow = require('../lib/flowjs-cmis');
var uploaderStore = require('./uploaderStore');
var actions = require('../actions');
var UploaderItem = require('./UploaderItem');
var app = require('../app');

var Uploader = React.createClass({
    mixins: [Reflux.connect(uploaderStore, "items"), Reflux.listenTo(uploaderStore,"onItemsChange")],
    flow: undefined,
    onItemsChange: function () {
        console.log('something changed!!');
    },
    getInitialState: function() {
        return { itemsCount: 0 };
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
            <h3>Uploader</h3>
            <button className="uploader-add-file">Add file</button>
            <div className="uploaderList">
                {uploaderItems}
            </div>
            <button className="uploader-start" onClick={this.handleStartUploadClick}>Start upload</button>
            <div className="counter">{this.state.itemsCount}</div>
        </div>;
    },
    handleStartUploadClick: function (evt) {
        evt.preventDefault();
        actions.uploaderStart();
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
        this.flow.assignBrowse(addFileButton);
    }
});

module.exports = Uploader;