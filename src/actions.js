var Reflux = require('reflux');

var actions = Reflux.createActions({
    "createSession": { children: ["sessionCreated", "sessionFailed"] },
    "fileBrowserLoadPath": {},
    "fileBrowserLoadRoot": {},
    "fileBrowserLoadBack": {},
    "fileBrowserUpdate": {},
    "fileBrowserDownloadFile": {},
    "uploaderAddFile": {},
    "uploaderStart": {}
});

module.exports = actions;