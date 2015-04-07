'use strict';
var React = require('react-native');
var MainPage = require('./src/Main/MainPage.ios.js');
require('./polyfills');

var config = require('./config.json.js');
var CmisConnector = require('./src/lib/cmisConnector');
var app = require('./src/app');
(function init() { app.cmisConnector = new CmisConnector({cmisBrowser: config.cmis.iosBrowser}); })();


var { AppRegistry, Text, NavigatorIOS } = React;

var CmisBrowser = React.createClass({
    render() {
        var initialRoute = {
            title: 'Cmis Browser',
            component: MainPage
        };
        return (
            <NavigatorIOS style={styles.container} initialRoute={initialRoute} />
        )
    }
});

var styles = React.StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('CmisBrowser', () => CmisBrowser);
