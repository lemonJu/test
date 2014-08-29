var http = require("http");
var url = require("url");

function response_(){}
response_.prototype = {
  proto_:null,
  pame:{},
  getParameter:function(key){
    return this.pame[key];
  },
  setParameter:function(key,value){
    this.pame[key] = value;
  }
};

function start(route,handle) {
  function onRequest(request, resp) {
    
    //继承resp并封装对象
    var response = new response_();
    response.proto_ = resp;


  	request.setEncoding('utf-8');
  	var postData = '';
    var pathname = url.parse(request.url).pathname;

    request.addListener('data',function(postDataChunk){
    	postData += postDataChunk;
      var index = postDataChunk.indexOf('='),
          key = postDataChunk.substring(0,index),
          value = postDataChunk.substring(index+1,postDataChunk.length);
      console.log(key + " :: " + value);
      response.setParameter(key,value);
      console.log("-------------------------");
      console.log(key);
      console.log(response.getParameter('text'));
      console.log("-------------------------");
    	console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener('end',function(postDataChunk){
    	route(pathname,handle,response);
    });


	
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.\n");
}


exports.start = start;