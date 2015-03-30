var React = require('react');
var FileItem = require('./FileItem');

var FileList = React.createClass({
    render() {
        var fileNodes = this.props.filesList.map(function (file) {
            return <FileItem file={file} key={file.key}></FileItem>
        });
        return <div className="fileList">
            {fileNodes}
        </div>
    }
});

module.exports = FileList;