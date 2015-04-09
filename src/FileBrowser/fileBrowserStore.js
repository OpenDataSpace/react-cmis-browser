var Reflux = require('reflux');
var app = require('../app');
var actions = require('../actions');

var fileBrowserStore = Reflux.createStore({
    list: [],
    rootFolderId: undefined,
    currentFolderId: undefined,
    currentFolderName: 'My',
    currentFolder: {
        id: undefined,
        name: 'My'
    },
    foldersHistory: [],
    init: function () {
        this.listenTo(actions.fileBrowserLoadRoot, this.onLoadRoot);
        this.listenTo(actions.fileBrowserLoadPath, this.onLoadPath);
        this.listenTo(actions.fileBrowserLoadBack, this.onLoadBack);
        this.listenTo(actions.fileBrowserReload, this.onLoadUpdate);
        this.listenTo(actions.fileBrowserDownloadFile, this.onFileDownload);
        this.listenTo(actions.fileBrowserUpdateState, this.triggerUpdateState);
    },
    onLoadRoot: function() {
        this.rootFolderId = app.cmisConnector.session.defaultRepository.rootFolderId;
        this.onLoadPath({id: this.rootFolderId, name: 'My'}, true);
    },
    onLoadUpdate: function() {
        this.onLoadPath(this.currentFolder, true);
    },
    onLoadBack: function() {
        var backFolder = this.foldersHistory.pop();
        if (backFolder) {
            this.onLoadPath(backFolder, true);
        }
    },
    onLoadPath: function(folder, preventHistory) {
        var session = app.cmisConnector.session;
        var self = this;
        session.getChildren(folder.id).ok(function (data) {
            if (!preventHistory) {
                self.foldersHistory.push(self.currentFolder);
            }
            app.cmisConnector.currentFolderId = folder.id;
            self.currentFolder = folder;
            self.list = [];
            data.objects.forEach(function (item) {
                self.list.push(self.convertFileItem(item, self.list.length));
            });
            self.triggerUpdateState();
        });
    },
    triggerUpdateState() {
        var history = this.foldersHistory;
        var backFolderName = history.length > 0 ? history[history.length - 1].name : '';
        this.trigger(this.list, {mainTitle: this.currentFolder.name, backTitle: backFolderName });
    },
    onFileDownload: function(fileId) {
        var session = app.cmisConnector.session;
        var url = session.getContentStreamURL(fileId, true);
        document.getElementById('downloader').src = url;
    },
    getInitialState: function () {
        console.log('get initial store state');
        return this.list;
    },
    convertFileItem: function(item, key) {
        return {
            key: key,
            name: item.object.succinctProperties['cmis:name'],
            isFolder: item.object.succinctProperties['cmis:objectTypeId'] === "cmis:folder",
            createdBy: item.object.succinctProperties['cmis:createdBy'],
            creationDate: item.object.succinctProperties['cmis:creationDate'],
            lastModificationDate: item.object.succinctProperties['cmis:lastModificationDate'],
            lastModifiedBy: item.object.succinctProperties['cmis:lastModifiedBy'],
            id: item.object.succinctProperties['cmis:objectId'],
            fileSize: item.object.succinctProperties['cmis:contentStreamLength']
        }
    }
});

module.exports = fileBrowserStore;