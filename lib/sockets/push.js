// Generated by CoffeeScript 1.4.0
(function() {
  var PushSocket, Socket, debug, types, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('./socket'), Socket = _ref.Socket, types = _ref.types;

  debug = require('debug')('socketmq:push');

  PushSocket = (function(_super) {

    __extends(PushSocket, _super);

    function PushSocket(context, options) {
      PushSocket.__super__.constructor.call(this, context, 'push', options);
      this.flushing = false;
      this.n = 0;
    }

    PushSocket.prototype.send = function(data) {
      return this.flushRoundRobin(data);
    };

    PushSocket.prototype.handleConnect = function(conn) {
      PushSocket.__super__.handleConnect.call(this, conn);
      return this.flushRoundRobin();
    };

    PushSocket.prototype.flushRoundRobin = function(data) {
      var conn, len;
      len = this.connections.length;
      if (len > 0 && !this.flushing) {
        console.log('plush');
        this.flushing = true;
        if ('undefined' !== typeof data) {
          this.outBuffer.push(data);
        }
        while (this.outBuffer.length > 0) {
          conn = this.connections[this.n++ % len];
          this.context.send(this, conn, this.outBuffer.shift());
        }
        return this.flushing = false;
      } else if ('undefined' !== typeof data) {
        if (this.outBuffer.length >= this.hwm) {
          return this.drop(data, 'high water mark reached (#{@hwm})');
        } else {
          return this.outBuffer.push(data);
        }
      }
    };

    return PushSocket;

  })(Socket);

  module.exports = PushSocket;

}).call(this);
