function preLoad(key){
  this.images={};
  if(storeCheck(key)){
    this.trail=JSON.parse(localStorage.getItem(key));
    for(crumb in this.trail.crumbs){
      if(crumb.type == 'location'){
        this.images.push({"type":"map","lat":crumb.lat,"lon":crumb.lng,"zoom":crumb.zoom});
      }else if(crumb.type == 'image'){
        this.images.push({"type":"image","src":crumb.src});
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
  this.item=imgs.shift();
  this.scale=1;
  this.size=$('.map--large').width()+'x'+$('.map--large').height();

  if(window.devicePixelRatio>=2){
    this.scale=2;
  }

  img.src=function(item){
    if(item.type == 'map'){
      return 'http://maps.googleapis.com/maps/api/staticmap?center='+item.lon+','+item.lat+'&zoom='+zoom+'&size='+this.size+'&scale='+this.scale;
    }else{
      return item.src;
    }
  }

  img.onLoad=function(){ stagerImageLoad(imgs)};
}