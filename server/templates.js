//declare the variables
var fs=require('fs-extra')
	,path=require('path')
	,_=require('underscore');

module.exports.fetch = fetch;
var TEMPLATE={};


//handles our template function
function fetch(req,res){
//	TEMPLATE.html="<div>Hello I am loaded from server</div>"; //load this from a file

  TEMPLATE.html=' <a href="http://google.com" class="round-button">OK</a>';
	if (req.query && req.query.callback) {
    res.set({
      // nice to have, but Chrome dont seem to mind either way
      'Access-Control-Allow-Origin': '*',
      // right content type prevent warnings and errors
      'Content-Type': 'text/javascript; charset=UTF-8',
      // optional, this is in seconds, equivalent to 8h
      'Cache-Control': 'public, max-age=28800'
    });
	 return res.send(200, "" + req.query.callback + "(" + JSON.stringify(TEMPLATE) + ");");
  } else {
    return res.send(200, TEMPLATE);
  }
}
