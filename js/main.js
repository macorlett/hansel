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

