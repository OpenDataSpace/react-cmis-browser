var React = require('react');
var Reflux = require('reflux');
var Ratchet = require('react-ratchet');
var { NavBar, NavButton, Title, TableView, TableViewCell, Button } = Ratchet;
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
        return { itemsCount: 0, backTitle: this.props.backTitle, statusText: "" };
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
        var status = this.state.statusText !== "" ? this.state.statusText : (this.state.itemsCount + " files");
        return <div className="uploader">
            <NavBar>
                <NavButton left onClick={this.handleBackClick}>{this.state.backTitle}</NavButton>
                <NavButton right icon={false} onClick={this.handleStartUploadClick}>Start</NavButton>
                <Title>Upload files</Title>
            </NavBar>
            <TableView>
                <TableViewCell></TableViewCell>
                <Button className="uploader-add-file" block outlined rStyle="positive" onClick={this.handleLogoutClick}>Add file</Button>
                <TableViewCell></TableViewCell>
                <div className="uploaderList">
                    {uploaderItems}
                </div>
                <TableViewCell divider>{status}</TableViewCell>
            </TableView>
        </div>;
    },
    handleBackClick() {
        this.context.router.goBack();
    },
    handleStartUploadClick: function () {
        this.flow.upload();
        this.setState({statusText: "Uploading..."});
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
            this.setState({statusText: ""});
        }.bind(this));
        this.flow.on('complete', function() {
            this.setState({statusText: "Successfully uploaded " + this.state.itemsCount + " files"});
            actions.fileBrowserReload();
            actions.uploaderClearFiles();
        }.bind(this));
        this.flow.assignBrowse(addFileButton);
    }
});

module.exports = Uploader;