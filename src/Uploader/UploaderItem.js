var React = require('react');
var Ratchet = require('react-ratchet');
var { TableViewCell } = Ratchet;
var actions = require('../actions');
var utils = require('../utils');

var UploaderItem = React.createClass({
    getInitialState: function() {
        return {
            fileSize: utils.fileUtils.bytesToSize(this.props.item.size)
        }
    },
    render: function () {
        return <TableViewCell>{this.props.item.name} | {this.state.fileSize}</TableViewCell>
    }
});

module.exports = UploaderItem;