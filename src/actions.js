var Reflux = require('reflux');

var actions = Reflux.createActions({
    "createSession": { children: ["sessionCreated", "sessionFailed"] },
    "fileBrowserLoadPath": {},
    "fileBrowserLoadRoot": {},
    "fileBrowserLoadBack": {},
    "fileBrowserReload": {},
    "fileBrowserUpdateState": {},
    "fileBrowserDownloadFile": {},
    "uploaderAddFile": {},
    "uploaderClearFiles": {}
});

module.exports = actions;