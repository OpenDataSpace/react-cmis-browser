var utils = {
    fileUtils: {
        bytesToSize: function(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (!bytes) {
                return 'n/a';
            }
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        }
    },
    stringUtils: {
        capitalize: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
};

module.exports = utils;