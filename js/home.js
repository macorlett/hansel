//resize
$(document).ready(initSizing);
$(window).resize(initSizing);

function initSizing(){
  //map item
  $('main').css({'height':$(window).height()+'px'});
}