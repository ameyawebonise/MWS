//declare the variables
var fs=require('fs-extra')
	,path=require('path')
	,_=require('underscore');

//expose the API
module.exports.list = list;

var DATA_FILE='./resources/myWidgets.json';

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



