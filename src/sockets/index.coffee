socket = require('./socket')

for k, v of socket
  exports[k] = v

sockets = 
  req: require('./req')

exports.sockets = sockets

