var React = require('react');
var actions = require('../actions');

var TabBar = React.createClass({
    render: function () {
        var classes = {
            my: "tab-item" + (this.props.repositoryName === "my" ? ' active' : ''),
            shared: "tab-item" + (this.props.repositoryName === "shared" ? ' active' : ''),
            global: "tab-item" + (this.props.repositoryName === "global" ? ' active' : '')
        };
        return <nav className="bar bar-tab">
            <a className={classes.my} onClick={this.handleItemClick.bind(null, 'my')}>
                <span className="icon icon-home"></span>
                <span className="tab-label">My</span>
            </a>
            <a className={classes.shared} onClick={this.handleItemClick.bind(null, 'shared')}>
                <span className="icon icon-person"></span>
                <span className="tab-label">Shared</span>
            </a>
            <a className={classes.global} onClick={this.handleItemClick.bind(null, 'global')}>
                <span className="icon icon-pages"></span>
                <span className="tab-label">Global</span>
            </a>
            <a className="tab-item"  onClick={this.handleItemClick.bind(null, 'search')}>
                <span className="icon icon-search"></span>
                <span className="tab-label">Search</span>
            </a>
            <a className="tab-item" onClick={this.handleItemClick.bind(null, 'settings')}>
                <span className="icon icon-gear"></span>
                <span className="tab-label">Settings</span>
            </a>
        </nav>
    },
    handleItemClick: function(tabName) {
        var repositories = ['my', 'shared', 'global'];
        if (repositories.indexOf(tabName) !== -1) {
            actions.fileBrowserOpenRepository(tabName);
        }
    }
});

module.exports = TabBar;