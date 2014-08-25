function trail(key){
  this.key=key; // trail storage id
  this.ac=0; //active crumb
  //this.watch; //watch object for location crumbs
  this.trail; // trail data
  this.crumbs={}; //crumb data
  this.mapUrl={};
  this.currentLoc;
  this.targetLoc;

  this.locationOptions={
    enableHighAccuracy:false,
    timeout:5000,
    maximumAge:30000
  };

  this.init();
}

trail.prototype.init=function(){
  if(!storeCheck(this.key)){
    //get data from server
    storeLocal(trailData);
  }

  this.trail=JSON.parse(localStorage.getItem(this.key));
  this.crumbs=this.trail.crumbs;
  this.ac=0;
  //preload(this.key); //start preloading images

  this.crumbHandler(this.crumbs[this.ac]);
}

trail.prototype.crumbHandler=function(crumb){

  this.renderCrumb(crumb); // render the current crumb

  if(this.ac>0){
    this.prevCrumbHandler(this.ac-1);
  }

  switch(crumb.type){
    case "location":
      locationCrumb(crumb,this);
      break;
    case "image":
      this.imageCrumb(crumb);
      break;
    case "text":
      this.textCrumb(crumb);
      break;
  }
}

trail.prototype.prevCrumbHandler=function(num){
  $('#crumb--'+num).addClass('prev--crumb');
  $('#crumb--'+this.ac).removeClass('next--crumb');
}

trail.prototype.imageCrumb=function(crumb){
  // send instructions to the input handler
  if(!crumb.success_type=='location'){
    this.inputHandler(crumb,this);
  }else{
    locationCrumb(crumb,this);
  }
}

trail.prototype.textCrumb=function(crumb){
  // send instructions to the input handler
  this.inputHandler(crumb,this);
}

trail.prototype.inputHandler=function(crumb,obj){

  // if the crumb requires an answer
  if(crumb.success_type=='answer'){
    // a an event to listen for the correct answer to the text question.
    $(document).on( 'input', '#answer--'+this.ac, function(){
      //console.log(this.value);
      if(this.value==crumb.answer){
        console.log('answer: '+this.value+' --> is correct!');
        obj.nextCrumb();
      }
    });
  // if the crumb just requires a button click
  }else if(crumb.success_type=='click'){
    $(document).on('click', '#continue--'+this.ac, function(){
      obj.nextCrumb();
    });
  }
}

trail.prototype.renderCrumb=function(crumb){
  //this function will handle the generation of html for each crumb
  $('#trail--container').append('<div id="crumb--'+this.ac+'" class="crumb--wrapper"></div>');
  if(this.ac>0){
    $('#crumb--'+this.ac).addClass('next--crumb');
  }
  $('#crumb--'+this.ac).append('<main></main>');

  switch(crumb.type){
    case "location":
      //render the map in the new crumb wrapper
      $('#crumb--'+this.ac+' main').append('<div class="map--wrapper"></div>');
      $('#crumb--'+this.ac+' .map--wrapper').append('<div class="map--large"></div>');
      $('#crumb--'+this.ac+' .map--large').append('<i class="fa fa-map-marker fa-fw fa-3x map--marker"></i>');
      
      $('#crumb--'+this.ac+' .map--large').css({'height':$('#crumb--'+this.ac+' .map--large').width()+'px'});
      $('#crumb--'+this.ac+' .map--wrapper').append('<h3></h3>');
      $('#crumb--'+this.ac+' .map--wrapper h3').text(crumb.place);

      //add map to the background of .map--large
      this.mapSize=$('#crumb--'+this.ac+' .map--large').width()+'x'+$('#crumb--'+this.ac+' .map--large').height();
      this.mapScale=1;
      if(window.devicePixelRatio>=2){
        this.mapScale=2;
      }
      this.mapUrl[this.ac]={
        "url":'http://maps.googleapis.com/maps/api/staticmap?center='+crumb.coords.lat+','+crumb.coords.lon+'&zoom='+crumb.zoom+'&size='+this.mapSize+'&scale='+this.mapScale
      };
      $('#crumb--'+this.ac+' .map--large').css({'background':'center/100% auto url('+this.mapUrl[this.ac].url+')'});
      break;
    case "text":
      //build wrapper
      $('#crumb--'+this.ac+' main').append('<div class="text--wrapper"></div>');
      // search trail for previous crumb types that arn't text

      if(!this.prevCrumbType){

        for(i=this.ac;i>=0;i--){
          if(this.crumbs[i].type!="text"){
            this.prevCrumbType=this.crumbs[i].type;
            this.prevCrumb=i;
            console.log("prev crumb type: "+this.prevCrumbType);
            break;
          }
        }
      }
      // insert the right image at the top of the text crumb
      if(this.prevCrumbType=="location"){
        //render mini map from previous crumb
        $('#crumb--'+this.ac+' .text--wrapper').append('<div class="map--small"></div>');
        $('#crumb--'+this.ac+' .map--small').append('<i class="fa fa-map-marker fa-fw fa-3x map--marker"></i>');
        $('#crumb--'+this.ac+' .map--small').css({'height':$('#crumb--'+this.ac+' .map--small').width()+'px'});
        $('#crumb--'+this.ac+' .map--small').css({'background':'center/300% auto url('+this.mapUrl[this.prevCrumb].url+')'});
      }else if(this.prevCrumbType=="image"){
        //render small image from previous crumb
        $('#crumb--'+this.ac+' .text--wrapper').append('<div class="image--small"></div>');
      }
      // insert text message / clue
      $('#crumb--'+this.ac+' .text--wrapper').append('<h3></h3>');
      $('#crumb--'+this.ac+' .text--wrapper h3').text(crumb.message);
      $('#crumb--'+this.ac+' .text--wrapper').append('<input id="answer--'+this.ac+'" type="text" value="">');
      break;
    case "image":
      // build wrapper
      $('#crumb--'+this.ac+' main').append('<div class="image---wrapper"></div>');
      //render large image
      $('#crumb--'+this.ac+' .image--wrapper').append('<div class="image--large"></div>');
      //render image text
      $('#crumb--'+this.ac+' .image--wrapper').append('<h3></h3>');
      $('#crumb--'+this.ac+' .image--wrapper h3').text(crumb.message);
      break;
  }

  // add action buttons at the bottom of each crumb
  $('#crumb--'+this.ac).append('<aside class="action--buttons"></aside>');
  $('#crumb--'+this.ac+' aside').append('<button id="prev--crumb" class="circle red"><i class="fa fa-arrow-left fa-fw fa-2x"></i></button>');
  $('#crumb--'+this.ac+' aside').append('<button id="tweet--crumb" class="circle blue"><i class="fa fa-twitter fa-fw fa-2x"></i></button>');
  $('#crumb--'+this.ac+' aside').append('<button id="help--crumb" class="circle orange"><i class="fa fa-exclamation fa-fw fa-2x"></i></button>');
}

trail.prototype.nextCrumb=function(){
  this.ac+=1;
  this.crumbHandler(this.crumbs[this.ac]);
}

//storage functions
function storeLocal(data){
  if(localStorage){
    this.store=JSON.stringify(data);
    this.key=data.id+data.author;

    if(storeCheck(this.key)){
      if(!storeUpdated(this.key,data.updated)){
        localStorage.setItem(this.key,this.store);
      }
    }else{
      localStorage.setItem(this.key,this.store);
    }
  }else{
    window.location="{{ site.url }}/support.html";
  }
}

function storeCheck(key){
  if(localStorage.getItem(key)===null){
    return false;
  }else{
    return true;
  }
}

function storeUpdated(key,time){
  this.data=JSON.parse(localStorage.getItem(key));
  if(this.data.updated>=time){
    return true;
  }else{
    return false;
  }
}

function locationCrumb(crumb,obj){
  //alert(JSON.stringify(obj));
  this.options=obj.trail.options;
  this.watch;
  if(!this.options){
    this.options={
      enableHighAccuracy: obj.locationOptions.enableHighAccuracy,
      timeout: obj.locationOptions.timeout,
      maximumAge: obj.locationOptions.maxAge
    };
  }
  if(navigator.geolocation){
    this.watch=navigator.geolocation.watchPosition(function(data){locationHandler(data,crumb,obj,this.watch)},function(data){errorHandler(data)},this.options);
  } 
}

function errorHandler(error){
  // replace the following  with a proper error handling function
  console.warn('ERROR('+error.code+'): '+error.message);
}

function locationHandler(data,crumb,obj,watch){
  this.targetLoc={"lat":crumb.coords.lat,"lon":crumb.coords.lon};

  console.log('target: lat '+this.targetLoc.lat+', lon '+this.targetLoc.lon);

  this.currentLoc={"lat":data.coords.latitude,"lon":data.coords.longitude};

  console.log('current: lat '+this.currentLoc.lat+', lon '+this.currentLoc.lon);

  //calculate distance between the target and current location
  this.r=6371;// k meters

  //convert lat and lon to radians
  /*
  this.tlat=targetLoc.lat.toRad();
  this.clat=currentLoc.lat.toRad();
  this.tlon=targetLoc.lon.toRad();
  this.clon=currentLoc.lon.toRad();

  this.dlat=(clat-tlat).toRad();
  this.dlon=(clon-tlon).toRad();

  //calculate the distance between the 2 points
  this.a=Math.sin(this.dlat/2)*Math.sin(this.dlat/2)+Math.sin(this.dlon/2)*Math.sin(this.dlon/2)*Math.cos(this.tlat)*Math.cos(this.clat);
  this.c=2*Math.atan2(Math.sqrt(this.a),Math.sqrt(1-this.a));

  this.dis=(r*c); //distance in meters
  */

  this.x=(currentLoc.lon-targetLoc.lon)*Math.cos((targetLoc.lat+currentLoc.lat)/2);
  this.y=(currentLoc.lat-targetLoc.lat);
  this.dis=(Math.sqrt(x*x + y*y)*r)*10; //seems to be of by a factor of 10?

  console.log('m: '+this.dis);

  //if the disance is within the threashold unlock the next crumb
  if(this.dis<=crumb.coords.threshold){
    //stop the watchPosition from checking
    navigator.geolocation.clearWatch(watch);
    //unlock next crumb
    obj.nextCrumb();
  }
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

$(document).ready(function(){
  storeLocal(trailData);
  var currentTrail= new trail('123@Blob');
});