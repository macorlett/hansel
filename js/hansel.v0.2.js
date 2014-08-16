function trail(key){
  this.key=key; // trail storage id
  this.ac; //active crumb
  this.watch;
  this.trail;
  this.crumbs;
  this.currentLoc={};
  this.targetLoc={};

  this.locatonOptions={
    enableHighAccuracy:false,
    timeout:5000,
    maximumAge:30000
  };

  init();
}

trail.prototype.init=function(){
  if(storeCheck(this.key)){
    this.trail=JSON.parse(localStorage(this.key));
    this.crumbs=trail.crumbs;
    this.ac=0;
    //preload(this.key); //start preloading images

    crumbHandler(this.crumbs[ac]);
  }else{
    //function to get trail from server
  }
}

trail.prototype.crumbHandler=function(crumb){
  switch(crumb.type){
    case "location":
      locationCrumb(crumb);
      break;
    case "image":
      imageCrumb(crumb);
      break;
    case "text":
      textCrumb(crumb);
      break;
  }
}

trail.prototype.locationCrumb=function(crumb){
  //call some function to getup the ui for this crumb

  if(this.trail.options){
    this.options={
      enableHighAccuracy:this.trail.options.highAccuracy,
      timeout:this.trail.options.timeout,
      maximumAge:this.trail.options.maxAge
    };
  }
  if(navigator.geolocation){
    this.watch=navigator.geolocation.watchPosition(locationHandler,errorHandler,this.locatonOptions);
  }
}

trail.prototype.locationHandler=function(data){
  this.targetLoc={"lat":this.crumbs[ac].lat,"lon":this.crumbs[ac].lon};
  this.currentLoc={"lat":data.coord.latitude,"lon":data.coord.longitude};

  //calculate distance between the target and current location

  //if its within x meters reveal new crumb
}

trail.prototype.imageCrumb=function(crumb){
  
}

trail.prototype.textCrumb=function(crumb){
  
}