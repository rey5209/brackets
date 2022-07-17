function fakeLoad(){
  
  var animate  = $(".animate").addClass("run");
  var distance = $(".content-container").offset().top; 
  

   
    // $(".content").show();
  
  var timer    = setTimeout(function(){ 
    // $(".content").attr("style","display:block !important");
    $(".content").show();
    $(".loader").fadeOut(250); 
    
    $('html,body').animate({
      scrollTop: distance
    }, 500); 
    
    var timer    = setTimeout(function(){ 
      $(".intro").fadeOut(250);
    }, 1000);
    
  }, 3000);

  
}

$(document).ready(function(){

  fakeLoad();

});