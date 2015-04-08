var React = require('react');
var Main = require('./src/Main/Main.js');
var config = require('./config.json.js');
var CmisConnector = require('./src/lib/cmisConnector');
var app = require('./src/app');

(function init() {
    config.cmis.onConnectCallback = function (session) {
        var cmisLocalServer = "http://" + window.location.host + config.webServer.proxySource;
        session.defaultRepository.repositoryUrl = session.defaultRepository.repositoryUrl.replace('https://', 'http://').replace(config.webServer.proxyTarget, cmisLocalServer);
        session.defaultRepository.rootFolderUrl = session.defaultRepository.rootFolderUrl.replace('https://', 'http://').replace(config.webServer.proxyTarget, cmisLocalServer);
    };
    app.cmisConnector = new CmisConnector(config.cmis);
})();

React.render(<Main />, document.getElementById('body'));