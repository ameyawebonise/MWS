//declare the variables
var fs=require('fs-extra')
	,path=require('path')
	,_=require('underscore');

//expose the API
module.exports.list = list;

var DATA_FILE='./resources/data.json';

var DATA=fs.readJsonSync(DATA_FILE);

function list(req,res){
	if (req.query && req.query.callback) {
	console.log("JSON P found")
    res.set({
      // nice to have, but Chrome dont seem to mind either way
      'Access-Control-Allow-Origin': '*',
      // right content type prevent warnings and errors
      'Content-Type': 'text/javascript; charset=UTF-8',
      // optional, this is in seconds, equivalent to 8h
      'Cache-Control': 'public, max-age=28800'
    });
	 return res.send(200, "" + req.query.callback + "(" + JSON.stringify(DATA) + ");");
  } else {
    return res.send(200, DATA);
  }
}


function templates(req,res){
	var TEMPLATE={};
	console.log("templates requrest");
	TEMPLATE.html="<div>Hello I am loaded from server</div>";
	console.log("this is " +TEMPLATE);

	if (req.query && req.query.callback) {
	console.log("JSON P found" + JSON.stringify(TEMPLATE))
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
