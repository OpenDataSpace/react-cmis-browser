var Reflux = require('reflux');
var actions = require('../actions');

var uploaderStore = Reflux.createStore({
    items: [],
    init: function () {
        this.listenTo(actions.uploaderAddFile, this.onAddFile);
        this.listenTo(actions.uploaderClearFiles, this.onClearFiles);
    },
    getInitialState: function () {
        return this.items;
    },
    onAddFile: function(file) {
        file.key = this.items.length;
        this.items.push(file);
        this.trigger(this.items);
    },
    onClearFiles: function() {
        this.items = [];
        this.trigger(this.items);
    }
});

module.exports = uploaderStore;