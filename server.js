if(!process.env.NODE_ENV)process.env.NODE_ENV='development'

var express=require('express') //express web server
	,path=require('path')
	,reload=require('reload')
	,colors=require('colors') //for tweaking the command line font color
	,http=require('http')  //the http server
	,widgets=require('./server/widgets')
	,templates=require('./server/templates')
	,fs = require('fs')//requrie cars
	,socket = require('socket.io');



var app= express();


var clientDir= path.join(__dirname+'/client');

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
   //app.set("jsonp callback", true);

})

//need to know what this is doing!
app.configure('development', function(){
  app.use(express.errorHandler());
})

//the file to render.As this is a single page app ,we will be having only 1 file!

app.get('/',function(req,res){
	console.log('index page requested');
	res.sendfile(path.join(clientDir, 'index.html'));
});

app.get('/widget',function(req,res){
	console.log("Done") ;
});

//define the routes

//load the templates
app.get('/api/templates',templates.fetch);
//get data
app.get('/api/widgets',widgets.list);



var server=http.createServer(app);
reload(server,app);


//set up the erver to listen on the port 3000
server.listen(app.get('port'),function(){
	console.log("Server started in %s mode on %d ",colors.red(process.env.NODE_ENV),app.get('port'));
})

var io = socket.listen(server);
var connectedClients=[];
var count=0;


io.sockets.on('connection', function (socket) {
  if(connectedClients.indexOf(socket)==-1)
  		connectedClients.push(socket);
  
  
  //1st event after connecttion
  socket.emit('connected',{hello:'world'}); 

  
  //request by the client to register
  socket.on('register', function (data) {
    console.log(data);
    count=connectedClients.length;
    io.sockets.emit('registered' ,{count : count});
  });


  //disconnect event
  socket.on('disconnect', function() {
      if(connectedClients.indexOf(socket)>-1){
      	connectedClients.splice(i,1);
      }
      count=connectedClients.length;
      io.sockets.emit('refresh',{count:count});
   });
});


