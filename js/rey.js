 (function() {
            var loaderText = document.getElementById("loading-msg");
            var refreshIntervalId = setInterval(function() {
                loaderText.innerHTML = getLoadingText();
            }, 2500);

            function getLoadingText() {
                var strLoadingText;
                var arrLoadingText = ["Please Wait", "Database Updating",
                ];
                var rand = Math.floor(Math.random() * arrLoadingText.length);
                return arrLoadingText[rand];
            }
        })();
// When document has been loaded, then allow body to scroll and hide preloader class.
 
//$(function(e){
  // $(".preloader").hide();
  // $("body").css("overflow", "scroll");
  // });

 // loading-msg

setTimeout(function(){
            $('.preloader').fadeToggle();
            $("body").css("overflow", "scroll");
        }, 1500);


setTimeout(function(){
            $('#cssload-pgloading').fadeToggle();
            $("body").css("overflow", "scroll");
        }, 1500);