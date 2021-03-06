// Generated by CoffeeScript 1.4.0
(function() {
  var PullSocket, Socket, debug, types, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('./socket'), Socket = _ref.Socket, types = _ref.types;

  debug = require('debug')('socketmq:pull');

  PullSocket = (function(_super) {

    __extends(PullSocket, _super);

    function PullSocket(context, options) {
      PullSocket.__super__.constructor.call(this, context, 'pull', options);
    }

    PullSocket.prototype.handleMessage = function(conn, data) {
      this.emit('message', data);
      return this;
    };

    return PullSocket;

  })(Socket);

  module.exports = PullSocket;

}).call(this);
