var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {
	'/start' : requestHandlers.start,
	'/index' : requestHandlers.index,
	'/upload':requestHandlers.upload,
	'/notFound':requestHandlers.notFound
};
server.start(router.route,handle);
