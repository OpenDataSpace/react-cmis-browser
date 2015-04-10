var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Main = require('./src/Main/Main.js');
var Auth = require('./src/Auth/Auth.js');
var FileBrowser = require('./src/FileBrowser/FileBrowser.js');
var Uploader = require('./src/Uploader/Uploader.js');
var SettingsPage = require('./src/Settings/SettingsPage.js');

(function init() {
    var config = require('./config.json.js');
    var CmisConnector = require('./src/lib/cmisConnector');
    var app = require('./src/app');
    config.cmis.onConnectCallback = function (session) {
        /*var cmisLocalServer = "http://" + window.location.host + config.webServer.proxySource;
        for (var key in session.repositories) {
            var repo = session.repositories[key];
            repo.repositoryUrl = repo.repositoryUrl.replace('https://', 'http://').replace(config.webServer.proxyTarget, cmisLocalServer);
            repo.rootFolderUrl = repo.rootFolderUrl.replace('https://', 'http://').replace(config.webServer.proxyTarget, cmisLocalServer);
        }*/
    };
    app.cmisConnector = new CmisConnector(config.cmis);
})();

var routes = (
    <Route handler={Main}>
        <DefaultRoute handler={Auth}/>
        <Route name="auth" handler={Auth}/>
        <Route name="fileBrowser" handler={FileBrowser}/>
        <Route name="uploader" handler={Uploader}/>
        <Route name="settings" handler={SettingsPage}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('body'));
});