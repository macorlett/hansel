var trailImages=[];

function preLoad(key){
  this.images=[];
  if(storeCheck(key)){
    this.trail=JSON.parse(localStorage.getItem(key));
    this.crumbs=this.trail.crumbs;
    for(key in crumbs){
      if(crumbs[key].type == 'location'){
        this.images.push({"type":"map","lat":crumbs[key].lat,"lon":crumbs[key].lng,"zoom":crumbs[key].zoom});
      }else if(crumb.type == 'image'){
        this.images.push({"type":"image","src":crumbs[key].src});
      }
    }
    stagerImageLoad(this.images);
  }
}

function stagerImageLoad(imgs){
  if(!imgs.length){
    return;
  }
  this.img=new Image();
  this.item=imgs[0];
  this.scale=1;
  this.size=$('.map--large').width()+'x'+$('.map--large').height();

  if(window.devicePixelRatio>=2){
    this.scale=2;
  }

  //this.img.src=
  if(this.item.type == 'map'){
    this.img.src='http://maps.googleapis.com/maps/api/staticmap?center='+this.item.lon+','+this.item.lat+'&zoom='+this.item.zoom+'&size='+this.size+'&scale='+this.scale;
  }else{
    this.img.src=this.item.src;
  }

  trailImages.push(this.img);

  this.img.onLoad=function(){
    alert('loading');
    stagerImageLoad(imgs.shift());
  };
}