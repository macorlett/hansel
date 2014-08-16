function trail(key){
  this.key=key; // trail storage id
  this.ac; //active crumb
  this.watch; //watch object for location crumbs
  this.trail; // trail data
  this.crumbs; //crumb data
  this.currentLoc;
  this.targetLoc;

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

    crumbHandler(this.crumbs[this.ac]);
  }else{
    //function to get trail from server
  }
}

trail.prototype.crumbHandler=function(crumb){
  renderCrumb(crumb); // render the current crumb

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

  if(this.trail.options){
    this.locationOptions={
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
  this.r=6371;//km

  //convert lat and lon to radians
  this.tlat=targetLoc.lat.toRad();
  this.clat=currentLoc.lat.toRad();
  this.tlon=targetLoc.lon.toRad();
  this.clon=currentLoc.lon.toRad();

  this.dlat=(clat-tlat).toRad();
  this.dlon=(clon-tlon).toRad();

  //calculate the distance between the 2 points
  this.a=Math.sin(this.dlat/2)*Math.sin(this.dlat/2)+Math.sin(this.dlon/2)*Math.sin(this.dlon/2)*Math.cos(this.tlat)*Math.cos(this.clat);
  this.c=2*Math.atan2(Math.sqrt(this.a),Math.sqrt(1-this.a));

  this.dis=(r*c)*1000; //distance in meters

  //if the disance is within the threashold unlock the next crumb
  if(this.dis<=this.crumbs[this.ac].threashold){
    //stop the watchPosition from checking
    navigator.geolocation.clearWatch(this.watch);
    //unlock next crumb
    nextCrumb();
  }
}

trail.prototype.imageCrumb=function(crumb){
  //this function will handle the image crumb conditions
}

trail.prototype.textCrumb=function(crumb){
  //this function will handle the text crumb conditions
}

trail.prototype.renderCrumb=function(crumb){
  //this function will handle the generation of html for each crumb
}

trail.prototype.nextCrumb=function(){
  this.ac+=1;
  crumbHandler(this.crumbs[this.ac]);
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}