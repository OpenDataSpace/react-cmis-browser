(function(window, cmis) {'use strict';

  function CmisConnector(connectOptions) {
    /**
     * CmisJS session object
     * @type {CmisSession}
     */
    this.session = null;

    /**
     * Root folder id
     * @type {string}
     */
    this.rootFolderId = null;

    this.url = connectOptions.cmisBrowser;

    // TODO: this is very very temp solution!!!!!!!
    this.onConnectCallback = connectOptions.onConnectCallback
  }

  CmisConnector.prototype = {

    hasActiveSession: function() {
      return !!this.session;
    },

    /**
     * Create CMISJS session
     */
    createSession: function(credentials, callbackOk, callbackError) {
      var session = this.session = cmis.createSession(this.url);
      session.setGlobalHandlers(console.warn, console.error);
      session.setCredentials(credentials.username, credentials.password).loadRepositories()
        .ok(function () {
          if (this.onConnectCallback instanceof Function) {
            this.onConnectCallback(session);
          }
          session.getObjectByPath('/')
            .ok(function (data) {
              this.rootFolderId = data.succinctProperties['cmis:objectId'];
              callbackOk();
            }.bind(this))
            .notOk(function() { callbackError(arguments[0]); })
        }.bind(this))
        .notOk(function() { callbackError(arguments[0]); })
        .error(function() { callbackError(arguments[0]); })
    },

    /**
     * Create CmisJS file
     * @param flowFile
     * @param callback
     */
    createFile: function(flowFile, callback) {
      var access = {};
      var type = flowFile.type || 'text/plain';
      access[this.username] = ['cmis:read'];
      this.session.createDocument(this.rootFolderId, undefined, flowFile.name, type, undefined, undefined, access, null, null)
        .ok(function (data) {
          flowFile.cmisId = data.succinctProperties['cmis:objectId'];
          callback.call(null, 'success', data);
        })
        .notOk(callback.bind(null, 'pending'))
        .error(callback.bind(null, 'pending'));
    },

    /**
     * Append File chunk to existing file
     * @param flowChunk
     * @param chunkContent
     * @param isLastChunk
     * @param callback | Possible variants of status: 'success', 'chunkError' - need to restart chunk upload, 'fileError' - need to restart the whole file upload
     */
    appendFileChunk: function(flowChunk, chunkContent, isLastChunk, callback) {
      this.session.appendContentStream(flowChunk.fileObj.cmisId, chunkContent, isLastChunk, {})
        .ok(function(data) {
          flowChunk.fileObj.cmisId = data.succinctProperties['cmis:objectId'];
          checkFileStatus.call(null, 'success', flowChunk.endByte, callback, data);
        })
        .notOk(checkFileStatus.bind(null, 'chunkError', flowChunk.endByte, callback))
        .error(checkFileStatus.bind(null, 'chunkError', flowChunk.endByte, callback));

      /**
       * Check that file chunk was correctly loaded
       * @param status
       * @param chunkEndByte
       * @param callback
       * @param data
       */
      function checkFileStatus(status, chunkEndByte, callback, data) {
        if (data.status === 409) {
          status = 'fileError';
        }
        else if (data.succinctProperties) {
          var contentStreamLength = data.succinctProperties["cmis:contentStreamLength"];
          //status = contentStreamLength === chunkEndByte ? status : "fileError";
        }
        callback.call(null, status, data);
      }
    },

    /**
     * Reset content of existing file to 0 bytes
     * @param flowFile
     * @param callback
     */
    resetFileContent: function(flowFile, callback) {
      this.session.deleteContentStream(flowFile.cmisId, {})
        .ok(callback.bind(null, 'success'))
        .notOk(callback.bind(null, 'fileError'))
        .error(callback.bind(null, 'fileError'));
    }
  };

  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    // Node module
    module.exports = CmisConnector;
  } else {
    // Otherwise expose Flow to the global object as usual
    window.CmisConnector = CmisConnector;

    // Register as a named AMD module
    if ( typeof define === "function" && define.amd ) {
      define( "CmisConnector", [], function () { return Flow; } );
    }
  }

})(window, window.cmis || require('cmis'));