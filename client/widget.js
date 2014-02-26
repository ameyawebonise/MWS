(function() {

var jQuery;
var WTEMPLATE;

//link up socket.io
var socket_io  = document.createElement('script');
    socket_io.type = "text/javascript";
    socket_io.src  = "http://localhost:3000/socket.io/socket.io.js";
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(socket_io);    

    //$("#someElement").append( script );

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);

} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}


/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    jQuery = window.jQuery.noConflict(true);
    main(); 
}


/*Gets the template from the server*/
function fetch_content(){
        jQuery.getJSON("http://127.0.0.1:3000/api/templates?callback=?", function(data){ 
            init_content(data);
         }); 
}

function init_content(data){
    WTEMPLATE=data.html;
    console.log(WTEMPLATE);
    jQuery(".midget-widget-container").html(WTEMPLATE);
}

var myWidgetsArr =[];


function fetch_widgets(){
    jQuery.getJSON("http://127.0.0.1:3000/api/widgets?callback=?", function(data){ 
            post_fetch_widgets(data);
         });    
}
  



function post_fetch_widgets(data){
   
    data.forEach(function(widget){
       myWidgetsArr.push(myWidget(widget));
    });

    myWidgetsArr.forEach(function(widget){
        widget.register();
      //  widget.print();
    });


}


/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 
        /******* Load CSS *******/
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "style.css" 
        });
        css_link.append('head');
       
     
    var socket = io.connect('http://localhost:3000');
  
    socket.on('connected', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });

     socket.emit('my other event 2', { my: 'data' });
   


 });

}


//widget model
function myWidget(data){
    
    var self={
        
        id : data.id,
    
        count : data.count,

        socket : io.connect('http://localhost:3000'),

        register:function(){
        /*
            self.socket.on("connected",function(data){
                //console.log(data);
                self.count=data.count;
                //self.socket.emit("register" ,{"foo":"bar"})
                console.log(self.id + " has " +self.count + " listeners");

                self.socket.emit("register" ,{_data:data});
            })*/
        },   

        print :function(){
            console.log(self.id + " has " +self.count + " listeners");
        }

    }
    return self;
}


})();