//navigation icon
$('.nav--icon').click(function(){
  $(this).toggleClass('arrow');
  return (this.t = !this.t) ? blackIn() : blackOut();
});

//resize
$(document).ready(initSizing);
$(window).resize(initSizing);

function initSizing(){
  //navigation
  $('.nav--draw').css({'height':($(window).height())+'px'});
  $('.nav--draw ul').css({'height':$('.nav--draw').height()-$('.draw--header').height()+'px'});

  //map item
  $('.map--large').css({'height':$('.map--large').width()+'px'});

}

// add / remove black--out
function blackIn(){
  $('body').append('<div class="black--out"></div>');
}
function blackOut(){
  $('.black--out').remove();
}

// map
function staticMap(lng,lat,zoom){
  var size=$('.map--large').width()+'x'+$('.map--large').height();

  // detect retina
  if(window.devicePixelRatio>=2){
    var scale=2;
  }else{
    var scale=1;
  }

  var mapUrl='http://maps.googleapis.com/maps/api/staticmap?center='+lng+','+lat+'&zoom='+zoom+'&size='+size+'&scale='+scale;

  $('.map--large').css({'background':'center/100% auto url('+mapUrl+')'});

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
})