var React = require('react');
var actions = require('../actions');
var utils = require('../utils');

var UploaderItem = React.createClass({
    getInitialState: function() {
        return {
            fileSize: utils.fileUtils.bytesToSize(this.props.item.size)
        }
    },
    render: function () {
        return <div className="fileItem">
            <div className="fileIcon"></div>
            <span className="name">{this.props.item.name}</span> |
            <span className="fileSize">{this.state.fileSize}</span>
            <p></p>
        </div>
    }
});

module.exports = UploaderItem;