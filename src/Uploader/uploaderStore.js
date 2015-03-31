var Reflux = require('reflux');
var actions = require('../actions');

var uploaderStore = Reflux.createStore({
    items: [],
    init: function () {
        this.listenTo(actions.uploaderAddFile, this.onAddFile);
        this.listenTo(actions.uploaderStart, this.onStartUpload);
    },
    getInitialState: function () {
        return this.items;
    },
    onAddFile: function(file) {
        file.key = this.items.length;
        this.items.push(file);
        this.trigger(this.items);
    },
    onStartUpload: function() {
        console.log('started');

    }
});

module.exports = uploaderStore;