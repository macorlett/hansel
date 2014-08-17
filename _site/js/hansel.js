//=========================//
//                         //
// Hansel.co - Client side //
//                         //
//=========================//

// front end to handle client side functions and data managment

function startTrail(trail){
  this.trail=trail; // trail data you are using to start a new trail.
  this.currentLoc={};
  this.targetLoc={};
  this.activeCrumb={}; //defaults to the first crumb

}

startTrail.prototype.init=function(trail){
  this.key=trail.id+trail.author;
  storeLocal(trail); // check to see if trail is in local storage
  preload(this.key); //start preloading images
  this.activeCrumb=getCrumb(this.key,0);

}

// other functions to follow

var currentLocation,
    lastLocation;

//store data locally
function storeLocal(data){
  if(typeof(Storage)!=="undefined"){
    this.store=JSON.stringify(data);
    this.keyName=data.id+data.author;

    //check if the data already exists
    if(storeCheck(this.keyName)){
      // is it up to date?
      if(!storeUpdated(this.keyName,data.updated)){
        //if not up to date then replace it
        localStorage.setItem(this.keyName,this.store);
      }
    }else{
      // if it doesn't exist create it
      localStorage.setItem(this.keyName,this.store);
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
  this.data=JSON.parse(localStorage.getItem(key));
  
  if(this.data.updated>=time){
    return true; //data is up to date
  }else{
    return false; //data is out of date
  }
}

function getCrumb(key,pos){
  this.trail=JSON.parse(localStorage.getItem(key));

  return this.trail.crumbs[pos];
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

function staticMap(lng,lat,zoom){
  var size=$('.map--large').width()+'x'+$('.map--large').height();

  // detect retina
  if(window.devicePixelRatio>=2){
    var scale=2;
  }else{
    var scale=1;
  }

  var mapUrl='http://maps.googleapis.com/maps/api/staticmap?center='+lng+','+lat+'&zoom='+zoom+'&size='+size+'&scale='+scale;

 // $('.map--large').css({'background':'center/100% auto url('+mapUrl+')'});

}

// example of loading local data into a location crumb
$(document).ready(function(){
  // store test data
  storeLocal(trail);
  
  //get first crumb
  var crumb=getCrumb('123@Blob',0);

  if(crumb.type === "location"){
    staticMap(crumb.lng,crumb.lat,crumb.zoom);
    if(crumb.place !== ""){
      $('.map--wrapper h3').text(crumb.place);
    }else{
      $('.map--wrapper h3').text('insert place name');
    }
  }else{
    alert("wrong crumb type:"+crumb.type);
  }
  //var lng=(-41.293008);
  //var lat=(174.775097);
  //staticMap(lng,lat,16);

  preLoad('123@Blob');
});