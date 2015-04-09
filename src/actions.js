var Reflux = require('reflux');

var actions = Reflux.createActions({
    "createSession": { children: ["sessionCreated", "sessionFailed"] },
    "authLogout": {},
    "fileBrowserLoadPath": {},
    "fileBrowserLoadBack": {},
    "fileBrowserReload": {},
    "fileBrowserUpdateState": {},
    "fileBrowserDownloadFile": {},
    "fileBrowserOpenRepository": {},
    "uploaderAddFile": {},
    "uploaderClearFiles": {}
});

module.exports = actions;