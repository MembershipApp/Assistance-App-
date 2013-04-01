var rootPath = __dirname;

// node modules
var http = require('http');
var url = require('url');

// custom modules
var config = require(rootPath+'/config.js').config();
var mongodb = require(rootPath+'/'+config.env+'/models/MongoDB.class.js').mongo();
var notif = require(rootPath+'/'+config.env+'/controllers/Notifications.class.js').notifications(rootPath);



/*
 * start the server instant
 */
var server = require(rootPath+'/'+config.env+'/'+config.env+'.js').

// get the server environment
server(http , url , mongodb , notif).

// listening to port below:
listen(config.port);

// console server port info
console.log("Server running at http://appzhao.com:"+server.address().port+' | '+config.env);
 
 