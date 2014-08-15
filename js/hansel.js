//=========================//
//                         //
// Hansel.co - Client side //
//                         //
//=========================//

// front end to handle client side functions and data managment

var currentLocation,
    lastLocation;

//store data locally
function storeLocal(data){
  if(typeof(Storage)!=="undefined"){
    var store=JSON.stringify(data);
    var keyName=data.id+data.author;
    var status="processing";

    //check if the data already exists
    if(storeCheck(keyName)){
      // is it up to date?
      if(!storeUpdated(keyName,data.updated)){
        //if not up to date then replace it
        localStorage.setItem(keyName,store);
        status="data updated";
      }
    }else{
      // if it doesn't exist create it
      localStorage.setItem(keyName,store);
      status="data stored locally";
    }
  }else{
    //redirect to the page that tells the user they need to upgrade their browser
    window.location="{{ site.url }}/browser.html";
  }
}

//check if data is already stored
function storeCheck(key){
  if(localStorage.getItem(key)===null){
    return false; // doesn't exist
  }else{
    return true; // data with this key exists
  }
}

//check if data is up to date
function storeUpdated(key,time){
  var data=JSON.parse(localStorage.getItem(key));
  
  if(data.updated>=time){
    return true; //data is up to date
  }else{
    return false; //data is out of date
  }
}

function getCrumb(key,pos){
  var trail=JSON.parse(localStorage.getItem(key));

  return trail.crumbs[pos];
}

function detectLocation(type,options){
  this.watch;
  this.options={};

  if(!options){
    this.options={
      enableHightAccuracy:false,
      timeout:5000,
      maximumAge:5000
    };
  }else{
    this.options=options;
  }

  this.locationHandler=function(data){
    locationTracker(data);
  }
  
  if(navigator.geolocation){
    if(type == 'watch'){
      this.watch = navigator.geolocation.watchPosition(this.locationHandler,this.locationHandler,this.options);
    }else if(type == 'get'){
      navigator.geolocation.getCurrentPosition(this.locationHandler,this.locationHandler,this.options);
    }
  }else{
    this.locationHandler();
  }
}

detectLocation.prototype.endWatch=function(){
  navigator.geolocation.clearWatch(this.watch);
}

function locationTracker(data){
  // in there i need to get target location from current crumb
  // get current location form data
  // and check the distance between the 2 points
  // if the person is close enough trigger net crumb
}

//var blob=new detectLocation('watch');