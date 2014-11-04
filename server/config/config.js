var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../'),
    staticPath = path.normalize(__dirname + '/../../public/');

process.env.NODE_PATH = rootPath;

module.exports = {
    development: {
        rootPath: rootPath,
        staticPath: staticPath,
        port: 4442,
        host: 'localhost'


    },
    production: {
        rootPath: rootPath,
        staticPath: staticPath,
        port: process.env.OPENSHIFT_NODEJS_PORT,
        host: process.env.OPENSHIFT_NODEJS_IP
    }

};
