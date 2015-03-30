var React = require('react');
var actions = require('../actions');

var FileItem = React.createClass({
    getInitialState: function() {
        return {
            creationDate: (new Date(this.props.file.creationDate)).toLocaleString(),
            lastModificationDate: (new Date(this.props.file.lastModificationDate)).toLocaleString(),
            fileSize: this.bytesToSize(this.props.file.fileSize)
        }
    },
    render: function () {
        return <div className="fileItem">
            <div className="fileIcon"></div>
            <a onClick={this.handleItemClick} href="" className="name">{this.props.file.name}</a> |
            <span className="fileSize">{this.state.fileSize}</span> |
            <span className="author">{this.props.file.createdBy}</span> |
            <span className="creationDate">{this.state.creationDate}</span> |
            <span className="lastModificationDate">{this.state.lastModificationDate}</span>
            <p></p>
        </div>
    },
    handleItemClick: function(evt) {
        evt.preventDefault();
        if (this.props.file.isFolder) {
            actions.fileBrowserLoadPath(this.props.file.id);
        }
        else {
            actions.fileBrowserDownloadFile(this.props.file.id);
        }
    },
    bytesToSize: function(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (!bytes) {
            return 'n/a';
        }
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
});

module.exports = FileItem;