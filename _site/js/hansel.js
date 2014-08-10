/*=========================//
// Hansel.co verison 0.0.1 //
//=========================//

https://github.com/macorlett/hansel
---
the following code is the backbone of hansel.co
---
copyright 2014 Michael Corlett.

*/

var http=require("http"),
    mongojs=require("mongojs");

var uri="mongodb://hansel:nzkl9Bm6898iKd94VF2UCdbd@ds027318.mongolab.com:27318/hansel",
    db=mongojs.connect(uri, ["hansel_trails","hansel_locations"]);

var server=http.createServer(requestHandler);

function requestHandler(req,res){

}