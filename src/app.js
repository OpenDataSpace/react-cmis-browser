var CmisConnector = require('./lib/cmisConnector');
var config = require('../config.json.js');

var app = {
    cmisConnector: undefined
};

(function init() {
    config.cmis.onConnectCallback = function (session) {
        var cmisLocalServer = "http://localhost:" + config.webServer.port + config.webServer.proxySource;
        session.defaultRepository.repositoryUrl = session.defaultRepository.repositoryUrl.replace('https://', 'http://').replace(config.webServer.proxyTarget, cmisLocalServer);
        session.defaultRepository.rootFolderUrl = session.defaultRepository.rootFolderUrl.replace('https://', 'http://').replace(config.webServer.proxyTarget, cmisLocalServer);
    };

    app.cmisConnector = new CmisConnector(config.cmis);
})();

module.exports = window.ReactCmisApp = app;