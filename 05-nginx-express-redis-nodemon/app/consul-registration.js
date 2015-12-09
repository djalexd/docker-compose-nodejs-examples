
/* Consul */
var host = process.env.CONSUL_PORT_8500_TCP_ADDR || '127.0.0.1';
var port = process.env.CONSUL_PORT_8500_TCP_PORT || 8500;

var consul = require('consul')({
    host: host,
    port: port
});

var consulRegistrator = function(_options) {

    var options = {
        serviceName: _options.serviceName || 'web',
        checkName: _options.checkName || 'check-web',
        port: _options.port || process.env.PORT || 3000,
        tags: _options.tags || ['web']
    };

    function register() {
        consul.agent.service.register({
            name: options.serviceName,
            tags: options.tags,
            port: options.port,
            address: '172.17.0.4'
        }, function(err) {
            if (err) throw err;
            console.log('registered with consul as ' + options.serviceName + ' on ' + '172.17.0.4');
        })
    }

    register();
};


module.exports = consulRegistrator;